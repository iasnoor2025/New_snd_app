import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Loader2, Pencil, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { ensureValidAuthToken, getAuthToken } from '@/utils/auth';

interface Position {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
}

interface PositionSelectorProps {
  value: number | null;
  onChange: (value: number | null) => void;
  initialPositions?: Position[];
  onPositionCreated?: (position: Position) => void;
}

const PositionSelector = ({ value, onChange, initialPositions = [], onPositionCreated }: PositionSelectorProps) => {
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [loading, setLoading] = useState(false);
  const [addingNew, setAddingNew] = useState(false);
  const [newPositionName, setNewPositionName] = useState('');
  const [newPositionDescription, setNewPositionDescription] = useState('');
  const [editingPositionId, setEditingPositionId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const fetchPositions = async () => {
    setLoading(true);
    let retries = 3;

    while (retries > 0) {
      try {
        // Ensure we have a valid auth token
        const isValid = await ensureValidAuthToken();
        if (!isValid) {
          toast.error('Authentication failed. Please log in again.');
          return;
        }

        const token = getAuthToken();
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          timeout: 5000 // 5 second timeout
        };

        // Use the current window location to determine the base URL
        const baseUrl = window.location.origin;
        const response = await axios.get(`${baseUrl}/api/employee-positions`, config);

        if (response.data.success && Array.isArray(response.data.data)) {
          const validPositions = response.data.data.filter((p: any): p is Position =>
            p !== null && p !== undefined && typeof p.id === 'number' && typeof p.name === 'string';
          );
          setPositions(validPositions);
          return; // Success, exit the function
        } else {
          throw new Error('Invalid response format from positions API');
        }
      } catch (error: any) {
        console.error(`Error fetching positions (attempts left: ${retries - 1}):`, error);

        if (error.code === 'ERR_NETWORK' && retries > 1) {
          // Network error, wait and retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          retries--;
          continue;
        }

        if (error.response?.status === 401) {
          toast.error('Your session has expired. Please log in again.');
          return;
        }

        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Failed to fetch positions. Please try again.');
        }
        break; // Exit the retry loop for non-network errors
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (initialPositions && Array.isArray(initialPositions)) {
      const validPositions = initialPositions.filter((p): p is Position =>
        p !== null && p !== undefined && typeof p.id === 'number' && typeof p.name === 'string';
      );
      setPositions(validPositions);
    }
  }, [initialPositions]);

  useEffect(() => {
    fetchPositions();
  }, []);

  const handleError = (error: any) => {
    if (error.response?.status === 401) {
      toast.error('Your session has expired. Please log in again.');
      window.location.href = '/login';
      return;
    }

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
  };

  const handleAddPosition = async () => {
    if (!newPositionName.trim()) {
      toast.error('Position name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/employee-positions', {
        name: newPositionName,
        description: newPositionDescription,
        is_active: true
      })

      const createdPosition = response.data;
      setPositions(prev => [...prev, createdPosition]);
      setAddingNew(false);
      setNewPositionName('');
      setNewPositionDescription('');
      setEditingPositionId(null);

      if (onPositionCreated) {
        onPositionCreated(createdPosition);
      }

      toast.success('Position created successfully');
    } catch (error: any) {
      console.error('Error creating position:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create position';
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        Object.values(validationErrors).forEach((messages: any) => {
          messages.forEach((message: string) => {
            toast.error(message);
          })
        })
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePosition = async () => {
    if (!editingPositionId || !newPositionName.trim()) {
      toast.error('Position name is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`/api/employee-positions/${editingPositionId}`, {
        name: newPositionName,
        description: newPositionDescription,
        is_active: true
      })

      if (response.data) {
        setPositions(prev => prev.map(p =>
          p.id === editingPositionId ? response.data : p
        ));

        toast.success('Position updated successfully');
        setNewPositionName('');
        setNewPositionDescription('');
        setEditingPositionId(null);
        setAddingNew(false);
      }
    } catch (error: any) {
      console.error('Error updating position:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update position';
      const validationErrors = error.response?.data?.errors;

      if (validationErrors) {
        Object.values(validationErrors).forEach((messages: any) => {
          messages.forEach((message: string) => {
            toast.error(message);
          })
        })
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePosition = async () => {
    if (!value) return;

    setLoading(true);
    try {
      await axios.delete(`/api/employee-positions/${value}`);
      toast.success('Position deleted successfully');
      onChange(null);
      await fetchPositions();
    } catch (error: any) {
      console.error('Error deleting position:', error);
      handleError(error);
    } finally {
      setLoading(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEditPosition = (position: Position) => {
    setAddingNew(true);
    setNewPositionName(position.name);
    setNewPositionDescription(position.description || '');
    setEditingPositionId(position.id);
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={value?.toString() || "none"}
        onValueChange={(val) => {
          const numericValue = val === "none" ? null : parseInt(val, 10);
          if (numericValue) {
            const selectedPosition = positions.find(p => p.id === numericValue);
            if (selectedPosition) {
              onChange(numericValue);
            }
          } else {
            onChange(null);
          }
        }}
        <SelectTrigger className="h-10">
          <SelectValue placeholder="Select position" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem key="select-none" value="none">Select a position</SelectItem>
          {positions.map((position) => (
            <SelectItem
              key={`position-${position.id}`}
              value={position.id ? position.id.toString() : "none"}
              {position.name || "Unnamed Position"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const selectedPosition = positions.find(p => p.id === value);
              if (selectedPosition) {
                handleEditPosition(selectedPosition);
              }
            }}
            <Pencil className="h-4 w-4" />
          </Button>
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDeleteDialogOpen(true);
                }}
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Position</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete the position "{positions.find(p => p.id === value)?.name}"?
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeletePosition}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={loading}
                  {loading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
      <Dialog open={addingNew} onOpenChange={setAddingNew}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="h-10"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setAddingNew(true);
              setNewPositionName('');
              setNewPositionDescription('');
              setEditingPositionId(null);
            }}
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingPositionId ? 'Edit Position' : 'Add New Position'}</DialogTitle>
            <DialogDescription>
              {editingPositionId ? 'Update the position details below.' : 'Enter the details for the new position.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Position Name</Label>
              <Input
                id="name"
                value={newPositionName}
                onChange={(e) => setNewPositionName(e.target.value)}
                placeholder="Enter position name"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (editingPositionId) {
                      handleUpdatePosition();
                    } else {
                      handleAddPosition();
                    }
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Input
                id="description"
                value={newPositionDescription}
                onChange={(e) => setNewPositionDescription(e.target.value)}
                placeholder="Enter position description"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (editingPositionId) {
                      handleUpdatePosition();
                    } else {
                      handleAddPosition();
                    }
                  }
                }}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => {
              setAddingNew(false);
              setNewPositionName('');
              setNewPositionDescription('');
              setEditingPositionId(null);
            }}>
              Cancel
            </Button>
            <Button
              onClick={editingPositionId ? handleUpdatePosition : handleAddPosition}
              disabled={loading || !newPositionName.trim()}
              {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingPositionId ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                editingPositionId ? 'Update Position' : 'Add Position'
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {loading && <p className="text-sm text-gray-500">Loading positions...</p>}
    </div>
  );
};

export default PositionSelector;



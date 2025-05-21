import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { EquipmentRental, EquipmentRentalStatus } from '../../types/equipmentRental';
import { Employee } from '../../types/employee';
import { Equipment } from '../../types/models';
import EquipmentRentalList from '../../components/EquipmentRental/EquipmentRentalList';
import EquipmentRentalForm from '../../components/EquipmentRental/EquipmentRentalForm';
import EquipmentRentalDetails from '../../components/EquipmentRental/EquipmentRentalDetails';
import { Breadcrumbs } from '../../components/ui/breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Alert, AlertDescription } from '../../components/ui/alert';
import {
  ChevronDown,
  Download,
  Plus,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

const EquipmentRentalManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [rentals, setRentals] = useState<EquipmentRental[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [selectedRental, setSelectedRental] = useState<EquipmentRental | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchEquipment();
    fetchRentals();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/api/employees');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setError('Failed to load employees');
    }
  };

  const fetchEquipment = async () => {
    try {
      const response = await axios.get('/api/equipment');
      setEquipment(response.data.data);
    } catch (error) {
      console.error('Error fetching equipment:', error);
      setError('Failed to load equipment');
    }
  };

  const fetchRentals = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/equipment-rentals');
      setRentals(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching equipment rentals:', error);
      setError('Failed to load rental data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRental = () => {
    setActiveTab('create');
  };

  const handleRentalCreated = () => {
    setActiveTab('list');
    fetchRentals();
  };

  const handleViewRental = (rental: EquipmentRental) => {
    setSelectedRental(rental);
    setActiveTab('details');
  };

  const handleReturnEquipment = async (rentalId: number, returnData: any) => {
    try {
      await axios.post(`/api/equipment-rentals/${rentalId}/return`, returnData);
      fetchRentals();
      if (selectedRental?.id === rentalId) {
        const response = await axios.get(`/api/equipment-rentals/${rentalId}`);
        setSelectedRental(response.data.data);
      }
    } catch (error) {
      console.error('Error returning equipment:', error);
      setError('Failed to process equipment return');
    }
  };

  const handleReportDamage = async (rentalId: number, damageData: any) => {
    try {
      await axios.post(`/api/equipment-rentals/${rentalId}/report-damage`, damageData);
      fetchRentals();
      if (selectedRental?.id === rentalId) {
        const response = await axios.get(`/api/equipment-rentals/${rentalId}`);
        setSelectedRental(response.data.data);
      }
    } catch (error) {
      console.error('Error reporting damage:', error);
      setError('Failed to report equipment damage');
    }
  };

  const handleUpdateStatus = async (rentalId: number, status: EquipmentRentalStatus) => {
    try {
      await axios.post(`/api/equipment-rentals/${rentalId}/update-status`, { status })
      fetchRentals();
      if (selectedRental?.id === rentalId) {
        const response = await axios.get(`/api/equipment-rentals/${rentalId}`);
        setSelectedRental(response.data.data);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update rental status');
    }
  };

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      const response = await axios.get(`/api/equipment-rentals/export?format=${format}`, {
        responseType: 'blob',
      })

      // Create a download link and trigger it
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `equipment_rentals.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting rentals:', error);
      setError('Failed to export rentals');
    }
  };

  const handleBackToList = () => {
    setActiveTab('list');
    setSelectedRental(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Breadcrumbs
            items={[
              { title: 'Dashboard', href: '/' },
              { title: 'Equipment Rental', href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight">Equipment Rental</h1>
          <p className="text-muted-foreground">
            Manage equipment rentals and assignments to employees
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => fetchRentals()}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                Export <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('excel')}>
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleCreateRental} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Equipment Rental
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="list">Rental List</TabsTrigger>
          <TabsTrigger value="create">Create Rental</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedRental}>
            Rental Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Equipment Rentals</CardTitle>
              <CardDescription>
                View and manage equipment assigned to employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EquipmentRentalList
                rentals={rentals}
                isLoading={isLoading}
                onViewRental={handleViewRental}
                onReturnEquipment={handleReturnEquipment}
                onReportDamage={handleReportDamage}
                onUpdateStatus={handleUpdateStatus}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <EquipmentRentalForm
            employees={employees}
            equipment={equipment}
            onRentalCreated={handleRentalCreated}
            onCancel={handleBackToList}
          />
        </TabsContent>

        <TabsContent value="details">
          {selectedRental && (
            <EquipmentRentalDetails
              rental={selectedRental}
              onBack={handleBackToList}
              onReturnEquipment={(returnData) => handleReturnEquipment(selectedRental.id, returnData)}
              onReportDamage={(damageData) => handleReportDamage(selectedRental.id, damageData)}
              onUpdateStatus={(status) => handleUpdateStatus(selectedRental.id, status)}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EquipmentRentalManagement;

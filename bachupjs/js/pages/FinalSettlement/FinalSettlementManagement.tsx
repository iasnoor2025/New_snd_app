import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FinalSettlement, FinalSettlementStatus } from '../../types/finalSettlement';
import { Employee } from '../../types/employee';
import FinalSettlementList from '../../components/finalSettlement/FinalSettlementList';
import FinalSettlementForm from '../../components/finalSettlement/FinalSettlementForm';
import FinalSettlementDetails from '../../components/finalSettlement/FinalSettlementDetails';
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

const FinalSettlementManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [settlements, setSettlements] = useState<FinalSettlement[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedSettlement, setSelectedSettlement] = useState<FinalSettlement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEmployees();
    fetchSettlements();
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

  const fetchSettlements = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/final-settlements');
      setSettlements(response.data.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching settlements:', error);
      setError('Failed to load settlement data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSettlement = () => {
    setActiveTab('create');
  };

  const handleSettlementCreated = () => {
    setActiveTab('list');
    fetchSettlements();
  };

  const handleViewSettlement = (settlement: FinalSettlement) => {
    setSelectedSettlement(settlement);
    setActiveTab('details');
  };

  const handleApproveSettlement = async (settlementId: number) => {
    try {
      await axios.post(`/api/final-settlements/${settlementId}/approve`);
      fetchSettlements();
      if (selectedSettlement?.id === settlementId) {
        const response = await axios.get(`/api/final-settlements/${settlementId}`);
        setSelectedSettlement(response.data.data);
      }
    } catch (error) {
      console.error('Error approving settlement:', error);
      setError('Failed to approve settlement');
    }
  };

  const handleRejectSettlement = async (settlementId: number, reason: string) => {
    try {
      await axios.post(`/api/final-settlements/${settlementId}/reject`, { reason })
      fetchSettlements();
      if (selectedSettlement?.id === settlementId) {
        const response = await axios.get(`/api/final-settlements/${settlementId}`);
        setSelectedSettlement(response.data.data);
      }
    } catch (error) {
      console.error('Error rejecting settlement:', error);
      setError('Failed to reject settlement');
    }
  };

  const handleProcessPayment = async (settlementId: number, paymentMethod: string, reference: string) => {
    try {
      await axios.post(`/api/final-settlements/${settlementId}/process-payment`, {
        payment_method: paymentMethod,
        reference: reference,
      })
      fetchSettlements();
      if (selectedSettlement?.id === settlementId) {
        const response = await axios.get(`/api/final-settlements/${settlementId}`);
        setSelectedSettlement(response.data.data);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('Failed to process payment');
    }
  };

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    try {
      const response = await axios.get(`/api/final-settlements/export?format=${format}`, {
        responseType: 'blob',
      })

      // Create a download link and trigger it
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = `final_settlements.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting settlements:', error);
      setError('Failed to export settlements');
    }
  };

  const handleBackToList = () => {
    setActiveTab('list');
    setSelectedSettlement(null);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Breadcrumbs
            items={[
              { title: 'Dashboard', href: '/' },
              { title: 'Final Settlement', href: '#' },
            ]}
          />
          <h1 className="text-3xl font-bold tracking-tight">Final Settlement</h1>
          <p className="text-muted-foreground">
            Manage final settlements for departing employees
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => fetchSettlements()}
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
          <Button onClick={handleCreateSettlement} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            New Settlement
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
          <TabsTrigger value="list">Settlement List</TabsTrigger>
          <TabsTrigger value="create">Create Settlement</TabsTrigger>
          <TabsTrigger value="details" disabled={!selectedSettlement}>
            Settlement Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Final Settlements</CardTitle>
              <CardDescription>
                View and manage settlements for departing employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FinalSettlementList
                settlements={settlements}
                isLoading={isLoading}
                onViewSettlement={handleViewSettlement}
                onApproveSettlement={handleApproveSettlement}
                onRejectSettlement={handleRejectSettlement}
                onProcessPayment={handleProcessPayment}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create">
          <FinalSettlementForm
            employees={employees}
            onSettlementCreated={handleSettlementCreated}
            onCancel={handleBackToList}
          />
        </TabsContent>

        <TabsContent value="details">
          {selectedSettlement && (
            <FinalSettlementDetails
              settlement={selectedSettlement}
              onBack={handleBackToList}
              onApprove={() => handleApproveSettlement(selectedSettlement.id)}
              onReject={(reason) => handleRejectSettlement(selectedSettlement.id, reason)}
              onProcessPayment={(paymentMethod, reference) =>
                handleProcessPayment(selectedSettlement.id, paymentMethod, reference)
              }
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinalSettlementManagement;

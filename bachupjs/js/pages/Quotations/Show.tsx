import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Quotation, QuotationItem } from "@/types/models";
import AdminLayout from "@/layouts/AdminLayout";
import { format } from "date-fns";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Icons
import {
  ArrowLeft,
  Calendar,
  Check,
  CircleDollarSign,
  Clock,
  Coins,
  FileText,
  Home,
  Pencil,
  Phone,
  Printer,
  Trash,
  User,
  ChevronRight,
  X
} from "lucide-react";
import { toast } from "sonner";

interface Props extends PageProps {
  quotation: Quotation & {
    customer: {
      id: number;
      company_name: string;
      contact_person: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      zip_code: string;
      postal_code?: string;
      country: string;
    }
  };
  quotationItems: {
    data: QuotationItem[];
    total: number;
  };
}

export default function Show({ auth, quotation, quotationItems }: Props) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  // Get status badge with appropriate color and icon
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "sent":
        return <Badge variant="outline" className="text-blue-600 border-blue-400">Sent</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "expired":
        return <Badge variant="destructive" className="bg-orange-500 hover:bg-orange-600">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  };

  // Format currency for display
  const formatCurrency = (amount: number | null | undefined) => {
    // Check for null, undefined, or NaN
    if (amount === null || amount === undefined || isNaN(Number(amount))) {
      return "SAR 0.00";
    }

    // Ensure amount is a number
    const numericAmount = Number(amount);

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "SAR",
    }).format(numericAmount);
  };

  // Get customer initials for avatar
  const getClientInitials = (clientName: string | undefined | null) => {
    if (!clientName) return "CU";

    return clientName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle deleting the quotation
  const handleDelete = () => {
    router.delete(route("quotations.destroy", quotation.id), {
      onSuccess: () => {
        toast.success("Quotation deleted successfully");
        router.visit(route("quotations.index"));
      },
      onError: () => toast.error("Failed to delete quotation"),
    })
  };

  // Handle approving the quotation
  const handleApprove = () => {
    router.post(route("quotations.approve", quotation.id), {}, {
      onSuccess: () => {
        toast.success("Quotation approved successfully");
        setIsApproveDialogOpen(false);
      },
      onError: () => toast.error("Failed to approve quotation"),
    })
  };

  // Handle rejecting the quotation
  const handleReject = () => {
    router.post(route("quotations.reject", quotation.id), {}, {
      onSuccess: () => {
        toast.success("Quotation rejected successfully");
        setIsRejectDialogOpen(false);
      },
      onError: () => toast.error("Failed to reject quotation"),
    })
  };

  return (
    <AdminLayout>
      <Head title={`Quotation #${quotation.quotation_number} `} />

      <div className="container mx-auto py-6 space-y-6">
        {/* Breadcrumbs and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center text-sm text-muted-foreground mb-4 sm:mb-0">
            <Link href={route("dashboard")} className="flex items-center hover:text-primary transition-colors">
              <Home className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={route("quotations.index")} className="hover:text-primary transition-colors">
              Quotations
            </Link>
            <ChevronRight className="h-4 w-4 mx-1" />
            <span className="font-medium text-foreground">#{quotation.quotation_number} </span>
          </div>

          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href={route("quotations.index")}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={route("quotations.print", quotation.id)} target="_blank">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Link>
            </Button>
            {quotation.status !== "approved" && quotation.status !== "rejected" && (
                <Button asChild variant="outline" size="sm">
                  <Link href={route("quotations.edit", quotation.id)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsApproveDialogOpen(true)}
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsRejectDialogOpen(true)}
                  <X className="mr-2 h-4 w-4 text-red-500" />
                  Reject
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(true)}
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Quotation Header */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-medium tracking-tight">Quotation #{quotation.quotation_number}</h1>
                  {getStatusBadge(quotation.status)}
                </div>
                <p className="text-muted-foreground text-xs mt-1">
                  Created on {format(new Date(quotation.created_at), "MMMM dd, yyyy")}
                </p>
              </div>

              <div className="md:col-span-6 flex flex-col items-end justify-center">
                <div className="text-xl font-medium">{formatCurrency(quotation.total_amount)}</div>
                <p className="text-muted-foreground text-xs">
                  Valid until {format(new Date(quotation.valid_until), "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* customer Information */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-muted-foreground" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quotation.customer && quotation.customer.company_name ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 bg-primary/10">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getClientInitials(quotation.customer.company_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-base font-medium">{quotation.customer.company_name}</h3>
                      <p className="text-muted-foreground text-xs">{quotation.customer.contact_person}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-[1fr_auto] gap-2 text-xs">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-right">{quotation.customer.email || 'Not provided'}</span>

                    <span className="text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-1" />Phone:
                    </span>
                    <span className="text-right">{quotation.customer.phone || 'Not provided'}</span>

                    <span className="text-muted-foreground">Address:</span>
                    <span className="text-right">{quotation.customer.address || 'Not provided'}</span>

                    <span className="text-muted-foreground">City:</span>
                    <span className="text-right">{quotation.customer.city || 'Not provided'}</span>

                    <span className="text-muted-foreground">State/Zip:</span>
                    <span className="text-right">
                      {quotation.customer.state ? `${quotation.customer.state}, ` : ''}
                      {quotation.customer.zip_code || quotation.customer.postal_code || 'Not provided'}
                    </span>

                    <span className="text-muted-foreground">Country:</span>
                    <span className="text-right">{quotation.customer.country || 'Not provided'}</span>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-muted-foreground italic py-4 text-center">
                    <p className="mb-2">No customer information available.</p>
                    <p className="text-xs">This quotation may need to be updated with a valid customer.</p>
                  </div>

                  {quotation.status !== "approved" && quotation.status !== "rejected" && (
                    <div className="flex justify-center">
                      <Button asChild variant="outline" size="sm">
                        <Link href={route("quotations.edit", quotation.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Update Customer
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quotation Details */}
          <div className="md:col-span-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Quotation Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Issue Date
                    </h4>
                    <p className="text-sm">
                      {format(new Date(quotation.issue_date), "MMMM dd, yyyy")}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Valid Until
                    </h4>
                    <p className="text-sm">
                      {format(new Date(quotation.valid_until), "MMMM dd, yyyy")}
                    </p>
                  </div>

                  {quotation.approved_at && (
                    <div className="space-y-1">
                      <h4 className="text-xs text-muted-foreground flex items-center">
                        <Check className="h-3 w-3 mr-1" />
                        Approved At
                      </h4>
                      <p className="text-sm">
                        {format(new Date(quotation.approved_at), "MMMM dd, yyyy")}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Status
                    </h4>
                    <p className="text-sm">
                      {getStatusBadge(quotation.status)}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <CircleDollarSign className="h-3 w-3 mr-1" />
                      Subtotal
                    </h4>
                    <p className="text-sm">{formatCurrency(quotation.subtotal)}</p>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground flex items-center">
                      <Coins className="h-3 w-3 mr-1" />
                      Tax ({quotation.tax_percentage}%)
                    </h4>
                    <p className="text-sm">{formatCurrency(quotation.tax_amount)}</p>
                  </div>

                  {quotation.discount_amount > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-xs text-muted-foreground">Discount ({quotation.discount_percentage}%)</h4>
                      <p className="text-sm text-red-600">
                        -{formatCurrency(quotation.discount_amount)}
                      </p>
                    </div>
                  )}

                  <div className="space-y-1">
                    <h4 className="text-xs text-muted-foreground">Total</h4>
                    <p className="text-base">{formatCurrency(quotation.total_amount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="items" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="items" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  Quotation Items ({quotationItems.total})
                </TabsTrigger>
                <TabsTrigger value="notes" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  Notes & Terms
                </TabsTrigger>
              </TabsList>

              <TabsContent value="items" className="pt-4">
                <Card>
                  <CardContent className="p-0 sm:p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Item Description</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Rate</TableHead>
                          <TableHead className="text-right">Rate Type</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quotationItems.data.map((item, index) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{index + 1}</TableCell>
                            <TableCell>
                              <div className="font-medium">{item.description}</div>
                              {item.equipment && (
                                <div className="text-xs text-muted-foreground">
                                  Equipment: {item.equipment.name}
                                </div>
                              )}
                              {item.operator && (
                                <div className="text-xs text-muted-foreground">
                                  {item.operator.category === 'driver' ? 'Driver' : 'Operator'}: {item.operator.name}
                                </div>
                              )}
                            </TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{formatCurrency(item.rate)}</TableCell>
                            <TableCell className="text-right capitalize">{item.rate_type}</TableCell>
                            <TableCell className="text-right font-medium">{formatCurrency(item.total_amount)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="pt-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Notes</h3>
                        {quotation.notes ? (
                          <div className="prose max-w-none">
                            <p className="whitespace-pre-line">{quotation.notes}</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground italic">No notes available for this quotation.</p>
                        )}
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-sm font-medium mb-2">Terms and Conditions</h3>
                        {quotation.terms_and_conditions ? (
                          <div className="prose max-w-none">
                            <p className="whitespace-pre-line">{quotation.terms_and_conditions}</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground italic">No terms and conditions specified.</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quotation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Confirmation Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Approval</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this quotation? This will move the rental to the mobilization phase.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleApprove}>
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Confirmation Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Rejection</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this quotation?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Reject
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

import React, { useState } from "react";
import { Button } from "../Components/Common/Button";
import { Input } from "../Components/Common/Input";
import { Select } from "../Components/Common/Select";
import { Card } from "../Components/Common/Card";
import { Modal } from "../Components/Common/Modal";
import { Table } from "../Components/Common/Table";
import { Tabs } from "../Components/Common/Tabs";
import { Accordion } from "../Components/Common/Accordion";
import { Alert } from "../Components/Common/Alert";
import { Plus, Search, User, Mail, Shield, Settings, Bell, FileText, HelpCircle, AlertTriangle } from "lucide-react";
import { Toast, ToastProvider, ToastViewport } from "../Components/Common/Toast";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const ComponentShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [dismissedAlerts, setDismissedAlerts] = useState<Set<string>>(new Set());
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<"default" | "destructive" | "success" | "warning" | "info">("default");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2; // Small page size for demonstration

  const mockUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User" },
    { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin" },
  ];

  const tableColumns = [;
    {
      key: "name",
      header: "Name",
      accessor: (user: User) => user.name,
      sortable: true,
    },
    {
      key: "email",
      header: "Email",
      accessor: (user: User) => user.email,
      sortable: true,
    },
    {
      key: "role",
      header: "Role",
      accessor: (user: User) => user.role,
      sortable: true,
    },
  ];

  const handleSort = (key: string, direction: "asc" | "desc") => {
    setSortKey(key);
    setSortDirection(direction);
  };

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const tabItems = [;
    {
      value: "profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <p>This is the profile tab content.</p>
        </div>
      ),
    },
    {
      value: "settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Settings</h3>
          <p>This is the settings tab content.</p>
        </div>
      ),
    },
    {
      value: "notifications",
      label: "Notifications",
      icon: <Bell className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <p>This is the notifications tab content.</p>
        </div>
      ),
    },
  ];

  const accordionItems = [;
    {
      value: "getting-started",
      label: "Getting Started",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p>Learn how to get started with our platform.</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>Create an account</li>
            <li>Set up your profile</li>
            <li>Configure your preferences</li>
          </ul>
        </div>
      ),
    },
    {
      value: "features",
      label: "Features",
      icon: <Settings className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p>Explore our platform features.</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>User management</li>
            <li>Content organization</li>
            <li>Analytics dashboard</li>
          </ul>
        </div>
      ),
    },
    {
      value: "faq",
      label: "FAQ",
      icon: <HelpCircle className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <p>Frequently asked questions.</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>How to reset password?</li>
            <li>How to contact support?</li>
            <li>How to upgrade plan?</li>
          </ul>
        </div>
      ),
    },
  ];

  const handleDismissAlert = (id: string) => {
    setDismissedAlerts((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const showToast = (variant: typeof toastVariant) => {
    setToastVariant(variant);
    setToastOpen(true);
  };

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>

      {/* Button Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button>Default Button</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button isLoading>Loading</Button>
          <Button leftIcon={<Plus className="h-4 w-4" />}>With Left Icon</Button>
          <Button rightIcon={<Plus className="h-4 w-4" />}>With Right Icon</Button>
        </div>
      </section>

      {/* Input Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Basic input" />
          <Input label="With Label" placeholder="Enter text" />
          <Input
            label="With Helper Text"
            helperText="This is a helper text"
            placeholder="Enter text"
          />
          <Input
            label="With Error"
            error="This field is required"
            placeholder="Enter text"
          />
          <Input
            label="With Tooltip"
            tooltip="This is a tooltip"
            placeholder="Enter text"
          />
          <Input
            leftIcon={<Search className="h-4 w-4" />}
            placeholder="Search..."
          />
        </div>
      </section>

      {/* Select Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Select</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Basic Select"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
              { value: "3", label: "Option 3", disabled: true },
            ]}
          />
          <Select
            label="With Helper Text"
            helperText="Select an option"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Select
            label="With Error"
            error="This field is required"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
          <Select
            label="With Tooltip"
            tooltip="Select an option from the list"
            options={[
              { value: "1", label: "Option 1" },
              { value: "2", label: "Option 2" },
            ]}
          />
        </div>
      </section>

      {/* Card Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card title="Basic Card">
            <p>Card content goes here</p>
          </Card>
          <Card
            title="Card with Description"
            description="This is a card description"
          >
            <p>Card content goes here</p>
          </Card>
          <Card
            title="Card with Actions"
            headerActions={<Button>Action</Button>}
          >
            <p>Card content goes here</p>
          </Card>
          <Card
            title="Card with Footer"
            footer={<Button>Footer Action</Button>}
          >
            <p>Card content goes here</p>
          </Card>
        </div>
      </section>

      {/* Table Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Table</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Table</h3>
            <Table
              data={mockUsers}
              columns={tableColumns}
              onSort={handleSort}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onRowClick={handleRowClick}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Table with Pagination</h3>
            <Table
              data={mockUsers}
              columns={tableColumns}
              onSort={handleSort}
              sortKey={sortKey}
              sortDirection={sortDirection}
              onRowClick={handleRowClick}
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={mockUsers.length}
              onPageChange={setCurrentPage}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Loading State</h3>
            <Table
              data={[]}
              columns={tableColumns}
              isLoading={true}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Empty State</h3>
            <Table
              data={[]}
              columns={tableColumns}
              emptyMessage="No users found"
            />
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tabs</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Default Tabs</h3>
            <Tabs items={tabItems} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Bordered Tabs</h3>
            <Tabs items={tabItems} variant="bordered" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Pills Tabs</h3>
            <Tabs items={tabItems} variant="pills" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Vertical Tabs</h3>
            <Tabs items={tabItems} orientation="vertical" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Full Width Tabs</h3>
            <Tabs items={tabItems} fullWidth />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Loading State</h3>
            <Tabs items={tabItems} isLoading />
          </div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accordion</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Default Accordion</h3>
            <Accordion items={accordionItems} />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Bordered Accordion</h3>
            <Accordion items={accordionItems} variant="bordered" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Separated Accordion</h3>
            <Accordion items={accordionItems} variant="separated" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Multiple Selection</h3>
            <Accordion items={accordionItems} type="multiple" />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Loading State</h3>
            <Accordion items={accordionItems} isLoading />
          </div>
        </div>
      </section>

      {/* Alert Section */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alerts</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-4">Default Alerts</h3>
            <div className="space-y-4">
              <Alert
                title="Default Alert"
                description="This is a default alert with a title and description."
              />
              <Alert
                title="Destructive Alert"
                description="This is a destructive alert indicating an error or critical issue."
                variant="destructive"
              />
              <Alert
                title="Success Alert"
                description="This is a success alert indicating a successful operation."
                variant="success"
              />
              <Alert
                title="Warning Alert"
                description="This is a warning alert indicating a potential issue."
                variant="warning"
              />
              <Alert
                title="Info Alert"
                description="This is an info alert providing additional information."
                variant="info"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Dismissible Alerts</h3>
            <div className="space-y-4">
              {!dismissedAlerts.has("dismissible-default") && (
                <Alert
                  title="Dismissible Alert"
                  description="This alert can be dismissed by clicking the close button."
                  dismissible
                  onClose={() => handleDismissAlert("dismissible-default")}
                />
              )}
              {!dismissedAlerts.has("dismissible-warning") && (
                <Alert
                  title="Dismissible Warning"
                  description="This warning alert can be dismissed."
                  variant="warning"
                  dismissible
                  onClose={() => handleDismissAlert("dismissible-warning")}
                />
              )}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Custom Icons</h3>
            <div className="space-y-4">
              <Alert
                title="Custom Icon Alert"
                description="This alert uses a custom icon."
                icon={<AlertTriangle className="h-4 w-4" />}
              />
              <Alert
                title="Custom Icon Warning"
                description="This warning alert uses a custom icon."
                variant="warning"
                icon={<Bell className="h-4 w-4" />}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Different Sizes</h3>
            <div className="space-y-4">
              <Alert
                title="Small Alert"
                description="This is a small alert."
                size="sm"
              />
              <Alert
                title="Large Alert"
                description="This is a large alert."
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Toast Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Toast</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={() => showToast("default")}>Show Default Toast</Button>
            <Button onClick={() => showToast("destructive")} variant="destructive">
              Show Destructive Toast
            </Button>
            <Button onClick={() => showToast("success")} variant="success">
              Show Success Toast
            </Button>
            <Button onClick={() => showToast("warning")} variant="warning">
              Show Warning Toast
            </Button>
            <Button onClick={() => showToast("info")} variant="info">
              Show Info Toast
            </Button>
          </div>

          <ToastProvider>
            {toastOpen && (
              <Toast
                title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Toast`}
                description="This is a toast notification"
                variant={toastVariant}
                duration={3000}
                onClose={() => setToastOpen(false)}
              />
            )}
            <ToastViewport />
          </ToastProvider>
        </div>
      </section>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="User Details"
        description="View user information"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{selectedUser.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>{selectedUser.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>{selectedUser.role}</span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ComponentShowcase;


</Input>
</Input>


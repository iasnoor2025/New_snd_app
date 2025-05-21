import React from "react";
import { Tabs } from "../Components/Common/Tabs";
import { Card } from "../Components/Common/Card";
import { Alert } from "../Components/Common/Alert";
import { Info } from "lucide-react";

interface ComponentDoc {
  name: string;
  description: string;
  props: {
    name: string;
    type: string;
    description: string;
    required?: boolean;
    default?: string;
  }[];
  examples: {
    title: string;
    description: string;
    code: string;
  }[];
}

const components: ComponentDoc[] = [
  {
    name: "Button",
    description: "A versatile button component that supports various styles, states, and features.",
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        description: "The visual style of the button",
        default: "default",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        description: "The size of the button",
        default: "default",
      },
      {
        name: "isLoading",
        type: "boolean",
        description: "Whether the button is in a loading state",
        default: "false",
      },
      {
        name: "leftIcon",
        type: "React.ReactNode",
        description: "Icon to display on the left side of the button",
      },
      {
        name: "rightIcon",
        type: "React.ReactNode",
        description: "Icon to display on the right side of the button",
      },
    ],
    examples: [
      {
        title: "Basic Usage",
        description: "A simple button with default styling",
        code: `<Button>Click me</Button>`,
      },
      {
        title: "With Variants",
        description: "Buttons with different visual styles",
        code: `<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>`,
      },
      {
        title: "With Icons",
        description: "Buttons with icons on either side",
        code: `<Button leftIcon={<Plus className="h-4 w-4" />}>Add Item</Button>
<Button rightIcon={<ArrowRight className="h-4 w-4" />}>Continue</Button>`,
      },
    ],
  },
  {
    name: "Table",
    description: "A flexible table component with sorting, pagination, and row selection capabilities.",
    props: [
      {
        name: "data",
        type: "T[]",
        description: "Array of data to display in the table",
        required: true,
      },
      {
        name: "columns",
        type: "Column<T>[]",
        description: "Column definitions for the table",
        required: true,
      },
      {
        name: "isLoading",
        type: "boolean",
        description: "Whether the table is in a loading state",
        default: "false",
      },
      {
        name: "pageSize",
        type: "number",
        description: "Number of items per page",
        default: "10",
      },
      {
        name: "currentPage",
        type: "number",
        description: "Current page number",
        default: "1",
      },
      {
        name: "totalItems",
        type: "number",
        description: "Total number of items (for server-side pagination)",
      },
      {
        name: "onPageChange",
        type: "(page: number) => void",
        description: "Callback when page changes",
      },
    ],
    examples: [
      {
        title: "Basic Table",
        description: "A simple table with data",
        code: `const columns = [
  { key: "name", header: "Name", accessor: (item) => item.name },
  { key: "email", header: "Email", accessor: (item) => item.email },
];

<Table data={users} columns={columns} />`,
      },
      {
        title: "With Pagination",
        description: "Table with pagination controls",
        code: `<Table
  data={users}
  columns={columns}
  pageSize={10}
  currentPage={currentPage}
  totalItems={totalUsers}
  onPageChange={setCurrentPage}
/>`,
      },
      {
        title: "With Sorting",
        description: "Table with sortable columns",
        code: `const columns = [
  {
    key: "name",
    header: "Name",
    accessor: (item) => item.name,
    sortable: true,
  },
];

<Table
  data={users}
  columns={columns}
  onSort={handleSort}
  sortKey={sortKey}
  sortDirection={sortDirection}
/>`,
      },
    ],
  },
  {
    name: "Alert",
    description: "A component for displaying important messages and notifications.",
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "success" | "warning" | "info"',
        description: "The visual style of the alert",
        default: "default",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        description: "The size of the alert",
        default: "default",
      },
      {
        name: "title",
        type: "string",
        description: "The title of the alert",
      },
      {
        name: "description",
        type: "React.ReactNode",
        description: "The content of the alert",
      },
      {
        name: "dismissible",
        type: "boolean",
        description: "Whether the alert can be dismissed",
        default: "false",
      },
      {
        name: "onClose",
        type: "() => void",
        description: "Callback when alert is dismissed",
      },
    ],
    examples: [
      {
        title: "Basic Alert",
        description: "A simple alert with title and description",
        code: `<Alert
  title="Success"
  description="Your changes have been saved successfully."
  variant="success"
/>`,
      },
      {
        title: "Dismissible Alert",
        description: "An alert that can be dismissed",
        code: `<Alert
  title="Warning"
  description="This action cannot be undone."
  variant="warning"
  dismissible
  onClose={() => console.log("Alert dismissed")}
/>`,
      },
      {
        title: "With Custom Icon",
        description: "An alert with a custom icon",
        code: `<Alert
  title="Custom Alert"
  description="This alert uses a custom icon."
  icon={<Bell className="h-4 w-4" />}
/>`,
      },
    ],
  },
  {
    name: "Toast",
    description: "A component for displaying temporary notifications.",
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "success" | "warning" | "info"',
        description: "The visual style of the toast",
        default: "default",
      },
      {
        name: "title",
        type: "string",
        description: "The title of the toast",
      },
      {
        name: "description",
        type: "React.ReactNode",
        description: "The content of the toast",
      },
      {
        name: "duration",
        type: "number",
        description: "Duration in milliseconds before auto-dismissing",
        default: "5000",
      },
      {
        name: "onClose",
        type: "() => void",
        description: "Callback when toast is closed",
      },
    ],
    examples: [
      {
        title: "Basic Toast",
        description: "A simple toast notification",
        code: `<Toast
  title="Success"
  description="Your changes have been saved."
  variant="success"
/>`,
      },
      {
        title: "With Custom Duration",
        description: "A toast with custom auto-dismiss duration",
        code: `<Toast
  title="Warning"
  description="This session will expire soon."
  variant="warning"
  duration={10000}
/>`,
      },
      {
        title: "With Close Handler",
        description: "A toast with a close handler",
        code: `<Toast
  title="Info"
  description="New updates available."
  onClose={() => console.log("Toast closed")}
/>`,
      },
    ],
  },
];

const Documentation: React.FC = () => {
  const docTabs = components.map((component) => ({
    value: component.name.toLowerCase(),
    label: component.name,
    content: (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">{component.name}</h2>
          <p className="text-muted-foreground">{component.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Props</h3>
          <div className="space-y-4">
            {component.props.map((prop) => (
              <Card key={prop.name} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {prop.name}
                      {prop.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </code>
                    <p className="text-sm text-muted-foreground mt-1">
                      {prop.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <code className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      {prop.type}
                    </code>
                    {prop.default && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Default: {prop.default}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Examples</h3>
          <div className="space-y-8">
            {component.examples.map((example) => (
              <div key={example.title}>
                <h4 className="text-lg font-medium mb-2">{example.title}</h4>
                <p className="text-muted-foreground mb-4">
                  {example.description}
                </p>
                <Card className="p-4">
                  <pre className="font-mono text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Component Documentation</h1>
          <Alert
            title="Welcome to the Component Library"
            description="This documentation provides detailed information about each component, including props, examples, and usage guidelines. Use the tabs below to navigate between components."
            icon={<Info className="h-4 w-4" />}
          />
        </div>

        <Tabs items={docTabs} />
      </div>
    </div>
  );
};

export default Documentation;

</Table>


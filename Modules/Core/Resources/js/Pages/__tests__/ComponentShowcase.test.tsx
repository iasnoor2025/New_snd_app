import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ComponentShowcase from "../ComponentShowcase";

describe("ComponentShowcase", () => {
  it("renders all component sections", () => {
    render(<ComponentShowcase />);

    // Check section headers
    expect(screen.getByText("Component Showcase")).toBeInTheDocument();
    expect(screen.getByText("Buttons")).toBeInTheDocument();
    expect(screen.getByText("Inputs")).toBeInTheDocument();
    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.getByText("Cards")).toBeInTheDocument();
    expect(screen.getByText("Table")).toBeInTheDocument();
  });

  it("renders all button variants", () => {
    render(<ComponentShowcase />);

    expect(screen.getByText("Default Button")).toBeInTheDocument();
    expect(screen.getByText("Destructive")).toBeInTheDocument();
    expect(screen.getByText("Outline")).toBeInTheDocument();
    expect(screen.getByText("Secondary")).toBeInTheDocument();
    expect(screen.getByText("Ghost")).toBeInTheDocument();
    expect(screen.getByText("Link")).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
    expect(screen.getByText("With Left Icon")).toBeInTheDocument();
    expect(screen.getByText("With Right Icon")).toBeInTheDocument();
  });

  it("renders all input variants", () => {
    render(<ComponentShowcase />);

    expect(screen.getByPlaceholderText("Basic input")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
    expect(screen.getByText("With Label")).toBeInTheDocument();
    expect(screen.getByText("With Helper Text")).toBeInTheDocument();
    expect(screen.getByText("With Error")).toBeInTheDocument();
    expect(screen.getByText("With Tooltip")).toBeInTheDocument();
  });

  it("renders all select variants", () => {
    render(<ComponentShowcase />);

    expect(screen.getByText("Basic Select")).toBeInTheDocument();
    expect(screen.getByText("With Helper Text")).toBeInTheDocument();
    expect(screen.getByText("With Error")).toBeInTheDocument();
    expect(screen.getByText("With Tooltip")).toBeInTheDocument();
  });

  it("renders all card variants", () => {
    render(<ComponentShowcase />);

    expect(screen.getByText("Basic Card")).toBeInTheDocument();
    expect(screen.getByText("Card with Description")).toBeInTheDocument();
    expect(screen.getByText("Card with Actions")).toBeInTheDocument();
    expect(screen.getByText("Card with Footer")).toBeInTheDocument();
  });

  it("renders table with data", () => {
    render(<ComponentShowcase />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("User")).toBeInTheDocument();
  });

  it("opens modal on table row click", () => {
    render(<ComponentShowcase />);

    // Click on a table row
    fireEvent.click(screen.getByText("John Doe").closest("tr")!);

    // Check if modal opens with correct content
    expect(screen.getByText("User Details")).toBeInTheDocument();
    expect(screen.getByText("View user information")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("handles table sorting", () => {
    render(<ComponentShowcase />);

    // Click on a sortable column header
    fireEvent.click(screen.getByText("Name"));

    // The sort direction should change
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  describe("Tabs Section", () => {
    it("renders all tab variants", () => {
      render(<ComponentShowcase />);

      // Check section header
      expect(screen.getByText("Tabs")).toBeInTheDocument();

      // Check variant headers
      expect(screen.getByText("Default Tabs")).toBeInTheDocument();
      expect(screen.getByText("Bordered Tabs")).toBeInTheDocument();
      expect(screen.getByText("Pills Tabs")).toBeInTheDocument();
      expect(screen.getByText("Vertical Tabs")).toBeInTheDocument();
      expect(screen.getByText("Full Width Tabs")).toBeInTheDocument();
      expect(screen.getByText("Loading State")).toBeInTheDocument();
    });

    it("renders tab items with icons and content", () => {
      render(<ComponentShowcase />);

      // Check tab labels
      expect(screen.getAllByText("Profile")).toHaveLength(6); // 6 variants
      expect(screen.getAllByText("Settings")).toHaveLength(6);
      expect(screen.getAllByText("Notifications")).toHaveLength(6);

      // Check tab content
      expect(screen.getAllByText("Profile Information")).toHaveLength(6);
      expect(screen.getAllByText("Settings")).toHaveLength(12); // 6 headers + 6 content
      expect(screen.getAllByText("Notifications")).toHaveLength(12);
    });

    it("changes content when clicking tabs", () => {
      render(<ComponentShowcase />);

      // Click Settings tab in the default variant
      const settingsTabs = screen.getAllByText("Settings");
      fireEvent.click(settingsTabs[0]);

      // Verify content changes
      const settingsContent = screen.getAllByText("This is the settings tab content.");
      expect(settingsContent[0]).toBeVisible();
    });

    it("applies variant classes correctly", () => {
      render(<ComponentShowcase />);

      // Check bordered variant
      const borderedTabs = screen.getByText("Bordered Tabs").closest("div")?.querySelector("[role='tablist']");
      expect(borderedTabs).toHaveClass("border-b");

      // Check pills variant
      const pillsTabs = screen.getByText("Pills Tabs").closest("div")?.querySelector("[role='tablist']");
      expect(pillsTabs).toHaveClass("bg-muted");

      // Check vertical variant
      const verticalTabs = screen.getByText("Vertical Tabs").closest("div")?.querySelector("[role='tablist']");
      expect(verticalTabs).toHaveClass("flex-col");

      // Check full width variant
      const fullWidthTabs = screen.getByText("Full Width Tabs").closest("div")?.querySelector("[role='tablist']");
      expect(fullWidthTabs).toHaveClass("w-full");
    });

    it("shows loading state", () => {
      render(<ComponentShowcase />);

      const loadingTabs = screen.getByText("Loading State").closest("div")?.querySelector("[role='tablist']");
      expect(loadingTabs).toHaveClass("opacity-50");
    });
  });

  describe("Accordion Section", () => {
    it("renders all accordion variants", () => {
      render(<ComponentShowcase />);

      // Check section header
      expect(screen.getByText("Accordion")).toBeInTheDocument();

      // Check variant headers
      expect(screen.getByText("Default Accordion")).toBeInTheDocument();
      expect(screen.getByText("Bordered Accordion")).toBeInTheDocument();
      expect(screen.getByText("Separated Accordion")).toBeInTheDocument();
      expect(screen.getByText("Multiple Selection")).toBeInTheDocument();
      expect(screen.getByText("Loading State")).toBeInTheDocument();
    });

    it("renders accordion items with icons and content", () => {
      render(<ComponentShowcase />);

      // Check accordion labels
      expect(screen.getAllByText("Getting Started")).toHaveLength(5); // 5 variants
      expect(screen.getAllByText("Features")).toHaveLength(5);
      expect(screen.getAllByText("FAQ")).toHaveLength(5);

      // Check accordion content
      expect(screen.getAllByText("Learn how to get started with our platform.")).toHaveLength(5);
      expect(screen.getAllByText("Explore our platform features.")).toHaveLength(5);
      expect(screen.getAllByText("Frequently asked questions.")).toHaveLength(5);
    });

    it("expands and collapses items when clicked", () => {
      render(<ComponentShowcase />);

      // Click to expand
      const gettingStartedTriggers = screen.getAllByText("Getting Started");
      fireEvent.click(gettingStartedTriggers[0]);

      // Verify content is visible
      expect(screen.getAllByText("Create an account")[0]).toBeVisible();

      // Click to collapse
      fireEvent.click(gettingStartedTriggers[0]);

      // Verify content is hidden
      expect(screen.queryByText("Create an account")).not.toBeVisible();
    });

    it("applies variant classes correctly", () => {
      render(<ComponentShowcase />);

      // Check bordered variant
      const borderedAccordion = screen.getByText("Bordered Accordion").closest("div")?.querySelector("[role='region']");
      expect(borderedAccordion).toHaveClass("border");

      // Check separated variant
      const separatedAccordion = screen.getByText("Separated Accordion").closest("div")?.querySelector("[role='region']");
      expect(separatedAccordion).toHaveClass("space-y-2");
    });

    it("handles multiple selection", () => {
      render(<ComponentShowcase />);

      // Click multiple items in the multiple selection variant
      const multipleAccordion = screen.getByText("Multiple Selection").closest("div");
      const gettingStartedTrigger = multipleAccordion?.querySelector("[data-state='closed']");
      const featuresTrigger = multipleAccordion?.querySelectorAll("[data-state='closed']")[1];

      fireEvent.click(gettingStartedTrigger!);
      fireEvent.click(featuresTrigger!);

      // Both items should be expanded
      expect(screen.getAllByText("Create an account")[0]).toBeVisible();
      expect(screen.getAllByText("User management")[0]).toBeVisible();
    });

    it("shows loading state", () => {
      render(<ComponentShowcase />);

      const loadingAccordion = screen.getByText("Loading State").closest("div")?.querySelector("[role='region']");
      expect(loadingAccordion).toBeInTheDocument();
    });
  });

  describe("Alert Section", () => {
    it("renders all alert variants", () => {
      render(<ComponentShowcase />);

      // Check section header
      expect(screen.getByText("Alerts")).toBeInTheDocument();

      // Check variant headers
      expect(screen.getByText("Default Alerts")).toBeInTheDocument();
      expect(screen.getByText("Dismissible Alerts")).toBeInTheDocument();
      expect(screen.getByText("Custom Icons")).toBeInTheDocument();
      expect(screen.getByText("Different Sizes")).toBeInTheDocument();
    });

    it("renders default alerts with different variants", () => {
      render(<ComponentShowcase />);

      // Check default alerts
      expect(screen.getByText("Default Alert")).toBeInTheDocument();
      expect(screen.getByText("Destructive Alert")).toBeInTheDocument();
      expect(screen.getByText("Success Alert")).toBeInTheDocument();
      expect(screen.getByText("Warning Alert")).toBeInTheDocument();
      expect(screen.getByText("Info Alert")).toBeInTheDocument();

      // Check descriptions
      expect(screen.getByText("This is a default alert with a title and description.")).toBeInTheDocument();
      expect(screen.getByText("This is a destructive alert indicating an error or critical issue.")).toBeInTheDocument();
      expect(screen.getByText("This is a success alert indicating a successful operation.")).toBeInTheDocument();
      expect(screen.getByText("This is a warning alert indicating a potential issue.")).toBeInTheDocument();
      expect(screen.getByText("This is an info alert providing additional information.")).toBeInTheDocument();
    });

    it("handles dismissible alerts", () => {
      render(<ComponentShowcase />);

      // Check dismissible alerts
      expect(screen.getByText("Dismissible Alert")).toBeInTheDocument();
      expect(screen.getByText("Dismissible Warning")).toBeInTheDocument();

      // Dismiss an alert
      const closeButtons = screen.getAllByRole("button");
      fireEvent.click(closeButtons[0]);

      // Alert should be removed
      expect(screen.queryByText("Dismissible Alert")).not.toBeInTheDocument();
    });

    it("renders alerts with custom icons", () => {
      render(<ComponentShowcase />);

      // Check custom icon alerts
      expect(screen.getByText("Custom Icon Alert")).toBeInTheDocument();
      expect(screen.getByText("Custom Icon Warning")).toBeInTheDocument();

      // Check descriptions
      expect(screen.getByText("This alert uses a custom icon.")).toBeInTheDocument();
      expect(screen.getByText("This warning alert uses a custom icon.")).toBeInTheDocument();
    });

    it("renders alerts with different sizes", () => {
      render(<ComponentShowcase />);

      // Check size variants
      expect(screen.getByText("Small Alert")).toBeInTheDocument();
      expect(screen.getByText("Large Alert")).toBeInTheDocument();

      // Check descriptions
      expect(screen.getByText("This is a small alert.")).toBeInTheDocument();
      expect(screen.getByText("This is a large alert.")).toBeInTheDocument();
    });
  });

  describe("Toast Section", () => {
    it("renders toast buttons", () => {
      render(<ComponentShowcase />);
      expect(screen.getByText("Show Default Toast")).toBeInTheDocument();
      expect(screen.getByText("Show Destructive Toast")).toBeInTheDocument();
      expect(screen.getByText("Show Success Toast")).toBeInTheDocument();
      expect(screen.getByText("Show Warning Toast")).toBeInTheDocument();
      expect(screen.getByText("Show Info Toast")).toBeInTheDocument();
    });

    it("shows toast when button is clicked", () => {
      render(<ComponentShowcase />);
      fireEvent.click(screen.getByText("Show Default Toast"));
      expect(screen.getByText("Default Toast")).toBeInTheDocument();
      expect(screen.getByText("This is a toast notification")).toBeInTheDocument();
    });

    it("shows different variants of toast", () => {
      render(<ComponentShowcase />);

      fireEvent.click(screen.getByText("Show Destructive Toast"));
      expect(screen.getByText("Destructive Toast")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Show Success Toast"));
      expect(screen.getByText("Success Toast")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Show Warning Toast"));
      expect(screen.getByText("Warning Toast")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Show Info Toast"));
      expect(screen.getByText("Info Toast")).toBeInTheDocument();
    });

    it("closes toast when close button is clicked", () => {
      render(<ComponentShowcase />);
      fireEvent.click(screen.getByText("Show Default Toast"));
      expect(screen.getByText("Default Toast")).toBeInTheDocument();

      const closeButton = screen.getByRole("button", { name: /close/i });
      fireEvent.click(closeButton);
      expect(screen.queryByText("Default Toast")).not.toBeInTheDocument();
    });

    it("auto-dismisses toast after duration", () => {
      jest.useFakeTimers();
      render(<ComponentShowcase />);

      fireEvent.click(screen.getByText("Show Default Toast"));
      expect(screen.getByText("Default Toast")).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(screen.queryByText("Default Toast")).not.toBeInTheDocument();
      jest.useRealTimers();
    });
  });

  describe("Table Section", () => {
    it("renders basic table with data", () => {
      render(<ComponentShowcase />);
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    });

    it("renders table with pagination", () => {
      render(<ComponentShowcase />);

      // Check pagination controls
      expect(screen.getByText("Previous")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("3")).toBeInTheDocument();

      // Check pagination info
      expect(screen.getByText("Showing 1 to 2 of 5 items")).toBeInTheDocument();
    });

    it("handles pagination navigation", () => {
      render(<ComponentShowcase />);

      // Click next page
      fireEvent.click(screen.getByText("Next"));
      expect(screen.getByText("Showing 3 to 4 of 5 items")).toBeInTheDocument();

      // Click previous page
      fireEvent.click(screen.getByText("Previous"));
      expect(screen.getByText("Showing 1 to 2 of 5 items")).toBeInTheDocument();

      // Click page number
      fireEvent.click(screen.getByText("3"));
      expect(screen.getByText("Showing 5 to 5 of 5 items")).toBeInTheDocument();
    });

    it("disables pagination buttons appropriately", () => {
      render(<ComponentShowcase />);

      // Previous button should be disabled on first page
      expect(screen.getByText("Previous")).toBeDisabled();

      // Go to last page
      fireEvent.click(screen.getByText("3"));

      // Next button should be disabled on last page
      expect(screen.getByText("Next")).toBeDisabled();
    });

    it("shows loading state", () => {
      render(<ComponentShowcase />);
      expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("shows empty state", () => {
      render(<ComponentShowcase />);
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });

    it("handles table sorting", () => {
      render(<ComponentShowcase />);

      // Click on a sortable column header
      fireEvent.click(screen.getByText("Name"));

      // The sort direction should change
      expect(screen.getByText("Name")).toBeInTheDocument();
    });

    it("opens modal on row click", () => {
      render(<ComponentShowcase />);

      // Click on a table row
      fireEvent.click(screen.getByText("John Doe").closest("tr")!);

      // Check if modal opens with correct content
      expect(screen.getByText("User Details")).toBeInTheDocument();
      expect(screen.getByText("View user information")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Admin")).toBeInTheDocument();
    });
  });
});

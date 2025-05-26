import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Documentation from "../Documentation";

describe("Documentation", () => {
  it("renders the documentation page with all components", () => {
    render(<Documentation />);

    // Check main heading
    expect(screen.getByText("Component Documentation")).toBeInTheDocument();

    // Check welcome alert
    expect(screen.getByText("Welcome to the Component Library")).toBeInTheDocument();

    // Check component tabs
    expect(screen.getByText("Button")).toBeInTheDocument();
    expect(screen.getByText("Table")).toBeInTheDocument();
    expect(screen.getByText("Alert")).toBeInTheDocument();
    expect(screen.getByText("Toast")).toBeInTheDocument();
  });

  describe("Button Documentation", () => {
    beforeEach(() => {
      render(<Documentation />);
      fireEvent.click(screen.getByText("Button"));
    });

    it("displays button component description", () => {
      expect(screen.getByText(/A versatile button component/)).toBeInTheDocument();
    });

    it("lists all button props", () => {
      expect(screen.getByText("variant")).toBeInTheDocument();
      expect(screen.getByText("size")).toBeInTheDocument();
      expect(screen.getByText("isLoading")).toBeInTheDocument();
      expect(screen.getByText("leftIcon")).toBeInTheDocument();
      expect(screen.getByText("rightIcon")).toBeInTheDocument();
    });

    it("shows button examples", () => {
      expect(screen.getByText("Basic Usage")).toBeInTheDocument();
      expect(screen.getByText("With Variants")).toBeInTheDocument();
      expect(screen.getByText("With Icons")).toBeInTheDocument();
    });
  });

  describe("Table Documentation", () => {
    beforeEach(() => {
      render(<Documentation />);
      fireEvent.click(screen.getByText("Table"));
    });

    it("displays table component description", () => {
      expect(screen.getByText(/A flexible table component/)).toBeInTheDocument();
    });

    it("lists all table props", () => {
      expect(screen.getByText("data")).toBeInTheDocument();
      expect(screen.getByText("columns")).toBeInTheDocument();
      expect(screen.getByText("isLoading")).toBeInTheDocument();
      expect(screen.getByText("pageSize")).toBeInTheDocument();
      expect(screen.getByText("currentPage")).toBeInTheDocument();
    });

    it("shows table examples", () => {
      expect(screen.getByText("Basic Table")).toBeInTheDocument();
      expect(screen.getByText("With Pagination")).toBeInTheDocument();
      expect(screen.getByText("With Sorting")).toBeInTheDocument();
    });
  });

  describe("Alert Documentation", () => {
    beforeEach(() => {
      render(<Documentation />);
      fireEvent.click(screen.getByText("Alert"));
    });

    it("displays alert component description", () => {
      expect(screen.getByText(/A component for displaying important messages/)).toBeInTheDocument();
    });

    it("lists all alert props", () => {
      expect(screen.getByText("variant")).toBeInTheDocument();
      expect(screen.getByText("size")).toBeInTheDocument();
      expect(screen.getByText("title")).toBeInTheDocument();
      expect(screen.getByText("description")).toBeInTheDocument();
      expect(screen.getByText("dismissible")).toBeInTheDocument();
    });

    it("shows alert examples", () => {
      expect(screen.getByText("Basic Alert")).toBeInTheDocument();
      expect(screen.getByText("Dismissible Alert")).toBeInTheDocument();
      expect(screen.getByText("With Custom Icon")).toBeInTheDocument();
    });
  });

  describe("Toast Documentation", () => {
    beforeEach(() => {
      render(<Documentation />);
      fireEvent.click(screen.getByText("Toast"));
    });

    it("displays toast component description", () => {
      expect(screen.getByText(/A component for displaying temporary notifications/)).toBeInTheDocument();
    });

    it("lists all toast props", () => {
      expect(screen.getByText("variant")).toBeInTheDocument();
      expect(screen.getByText("title")).toBeInTheDocument();
      expect(screen.getByText("description")).toBeInTheDocument();
      expect(screen.getByText("duration")).toBeInTheDocument();
      expect(screen.getByText("onClose")).toBeInTheDocument();
    });

    it("shows toast examples", () => {
      expect(screen.getByText("Basic Toast")).toBeInTheDocument();
      expect(screen.getByText("With Custom Duration")).toBeInTheDocument();
      expect(screen.getByText("With Close Handler")).toBeInTheDocument();
    });
  });

  it("navigates between components", () => {
    render(<Documentation />);

    // Start with Button documentation
    expect(screen.getByText(/A versatile button component/)).toBeInTheDocument();

    // Navigate to Table
    fireEvent.click(screen.getByText("Table"));
    expect(screen.getByText(/A flexible table component/)).toBeInTheDocument();

    // Navigate to Alert
    fireEvent.click(screen.getByText("Alert"));
    expect(screen.getByText(/A component for displaying important messages/)).toBeInTheDocument();

    // Navigate to Toast
    fireEvent.click(screen.getByText("Toast"));
    expect(screen.getByText(/A component for displaying temporary notifications/)).toBeInTheDocument();
  });
});

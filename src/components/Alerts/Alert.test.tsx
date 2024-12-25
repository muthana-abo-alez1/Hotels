import { render, screen } from "@testing-library/react";
import Alert from "./Alert"; 
import { AlertColor } from "@mui/material/Alert";
import '@testing-library/jest-dom';
import { SnackbarContent } from "notistack";
import React from 'react';

jest.mock("./Alert.module.scss", () => ({
  alertContainer: "mocked-alert-container",
  alertTitle: "mocked-alert-title",
}));

describe("Alert Component", () => {
  it("should render with correct title, type, and text", () => {
    const props = {
      title: "Test Title",
      type: "success" as AlertColor,
      text: "This is a test message.",
    };

    render(<Alert {...props} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test message.")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("mocked-alert-container");
  });

  it("should apply correct severity based on 'type' prop", () => {
    const props = {
      title: "Test Title",
      type: "error" as AlertColor, 
      text: "This is an error message.",
    };

    render(<Alert {...props} />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledError");
  });

  it("should render with correct classes from CSS module", () => {
    const props = {
      title: "Test Title",
      type: "success" as AlertColor,
      text: "This is a success message.",
    };

    render(<Alert {...props} />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("mocked-alert-container");
    expect(screen.getByText("Test Title")).toHaveClass("mocked-alert-title");
  });

  it("should render alert with appropriate styling based on 'severity'", () => {
    const props = {
      title: "Test Title",
      type: "warning" as AlertColor,
      text: "This is a warning message.",
    };

    render(<Alert {...props} />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-filledWarning");
  });
});

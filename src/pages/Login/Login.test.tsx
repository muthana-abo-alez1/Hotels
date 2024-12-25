import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login"; 
import '@testing-library/jest-dom';
import React from "react";

jest.mock('react-leaflet', () => ({
  MapContainer: () => <div>Mocked MapContainer</div>,
  TileLayer: () => <div>Mocked TileLayer</div>,
  Marker: () => <div>Mocked Marker</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(() => ({ pathname: '/admin' })),
  Outlet: () => <div>Mocked Outlet</div>,
}));

jest.mock('src/context/AuthContext', () => ({
  useAuth: jest.fn(() => ({ isAuthenticated: true })),
}));

jest.mock('src/context/ThemeContext', () => ({
  useTheme: jest.fn(() => ({ theme: 'light', toggleTheme: jest.fn() })),
}));

describe("Login Component", () => {
  it("should render login form with username, password fields and submit button", () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("should show validation error when fields are empty and form is submitted", async () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    expect(await screen.findByText(/Username is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password is required/i)).toBeInTheDocument();
  });

});

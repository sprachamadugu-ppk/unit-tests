import { render, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Dashboard from "./Dashboard";
import { getDashboard } from "../api/api-calls";

jest.mock("../api/api-calls");

describe("Dashboard Component", () => {
  test("renders dashboard data", async () => {
    const mockDashboardData = [
      { name: "Item 1", count: 5 },
      { name: "Item 2", count: 10 },
    ];
    (getDashboard as jest.Mock).mockImplementation(() =>
    Promise.resolve(mockDashboardData)
  );
    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <Dashboard />
        </ThemeProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(getDashboard).toHaveBeenCalledWith("");

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  test("renders dashboard data", async () => {
    (getDashboard as jest.Mock).mockRejectedValue(new Error("API error"));

    render(
      <MemoryRouter>
        <ThemeProvider theme={createTheme()}>
          <Dashboard />
        </ThemeProvider>
      </MemoryRouter>
    );

    await act(async () => {
      await Promise.resolve();
    });

    expect(getDashboard).toHaveBeenCalledWith("");

 expect(screen.getByText(/Error fetching dashboard data: API error/i)).toBeInTheDocument();  });
});

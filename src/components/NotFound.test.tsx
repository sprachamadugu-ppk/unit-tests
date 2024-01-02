import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { MemoryRouter } from "react-router-dom";
import NotFoundPage from "./NotFound";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));
  describe("testingNotFound Page", () => {

test("renders 404 page with proper content", () => {
  render(<NotFoundPage />, { wrapper: MemoryRouter });

  expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  expect(
    screen.getByText(/The page you are looking for does not exist/i)
  ).toBeInTheDocument();
});

test("clicking 'Go to Dashboard' button navigates to the dashboard", () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);
  
    render(<NotFoundPage />);
  
    fireEvent.click(screen.getByText(/Go to Dashboard/i));
  
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});

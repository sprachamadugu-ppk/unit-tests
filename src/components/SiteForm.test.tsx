import { render, screen,  } from "@testing-library/react";
import "@testing-library/jest-dom";
import SiteForm from "./SiteForm";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mocking the useFetch hook
jest.mock("./usefetch", () => ({
  useFetch: jest.fn(() => ({
    simulationsData: [
      { id: "1", name: "Simulation 1" },
      { id: "2", name: "Simulation 2" },
    ],
    adminData: [
      { id: "admin1", firstname: "John", lastname: "Doe" },
      { id: "admin2", firstname: "Jane", lastname: "Doe" },
    ],
  })),
}));

// Mocking the postData function
jest.mock("../api/api-calls", () => ({
  postData: jest.fn(() => ({ status: 200 })),
}));

// Mock the context value for the authToken
const mockContextValue = { token: "mockToken" };
jest.mock("../context/TokenContext", () => ({
  ...jest.requireActual("../context/TokenContext"),
  authToken: {
    Consumer: ({ children }: { children: (value: any) => React.ReactNode }) =>
      children(mockContextValue),
    Provider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  },
}));

describe("SiteForm Component", () => {
  beforeEach(() => {
    render(<SiteForm />);
  });
  test("renders form fields", async () => {
    expect(screen.getByLabelText(/Site Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Simulations/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Company Admin/i)).toBeInTheDocument();
  });

  // test("fills form fields with data", async () => {
  //   // Modify this test based on the actual data structure returned by the useFetch hook
  //   // For example, you might need to update the value passed to fireEvent.change for Autocomplete components

  //   fireEvent.change(screen.getByLabelText(/Site Name/i), { target: { value: "Test Site" } });
  //   fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "Test Location" } });
  //   fireEvent.change(screen.getByLabelText(/Simulations/i), { target: { value: [{ id: "1", name: "Simulation 1" }] } });
  //   fireEvent.change(screen.getByLabelText(/Company Admin/i), { target: { value: [{ id: "admin1", firstname: "John", lastname: "Doe" }] } });

  //   expect(screen.getByLabelText(/Site Name/i)).toHaveValue("Test Site");
  //   expect(screen.getByLabelText(/Location/i)).toHaveValue("Test Location");
  //   // Add similar expectations for other fields based on your data
  // });

  // test("displays error messages for empty fields", async () => {
  //   fireEvent.click(screen.getByText(/Submit/i));

  //   await waitFor(() => {
  //     expect(screen.getByText(/Site Name is required/i)).toBeInTheDocument();
  //     expect(screen.getByText(/Location is required/i)).toBeInTheDocument();
  //     // Add similar expectations for other fields based on your data
  //   });
  // });

  // test("submits the form and shows success message", async () => {
  //   fireEvent.change(screen.getByLabelText(/Site Name/i), { target: { value: "Test Site" } });
  //   fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: "Test Location" } });
  //   fireEvent.change(screen.getByLabelText(/Simulations/i), { target: { value: [{ id: "1", name: "Simulation 1" }] } });
  //   fireEvent.change(screen.getByLabelText(/Company Admin/i), { target: { value: [{ id: "admin1", firstname: "John", lastname: "Doe" }] } });

  //   fireEvent.click(screen.getByText(/Submit/i));

  //   // Wait for the success message to appear
  //   await waitFor(() => {
  //     expect(screen.getByText(/Successfully created new company/i)).toBeInTheDocument();
  //   });
  // });
});

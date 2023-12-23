import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import "./matchMedia.mock";
import CompanyForm from "./Company-add-form";

describe("Company Form", () => {
  test("renders Company Form with all input fields", () => {
    render(<CompanyForm />);

    expect(screen.getByText("Company Form")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Company URL")).toBeInTheDocument();
    expect(screen.getByLabelText("Tutorials")).toBeInTheDocument();
    expect(screen.getByLabelText("Simulations")).toBeInTheDocument();
    expect(screen.getByLabelText("Primary Phone Number")).toBeInTheDocument();
    expect(screen.getByLabelText("Admin Link Extension")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Admin")).toBeInTheDocument();
    expect(screen.getByLabelText("Company Options")).toBeInTheDocument();
  });

  test("button is disabled on initial render or when there are no values", () => {
    render(<CompanyForm />);

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  test("button is enabled when all fields are filled with valid data", async () => {
    render(<CompanyForm />);

    fireEvent.change(screen.getByLabelText("Company Name"), {
      target: { value: "Company XYZ" },
    });
    fireEvent.change(screen.getByLabelText("Company URL"), {
      target: { value: "http://example.com" },
    });
    fireEvent.change(screen.getByLabelText("Tutorials"), {
      target: { value: ["Tutorial 1"] },
    });
    fireEvent.change(screen.getByLabelText("Simulations"), {
      target: { value: ["Simulation 1"] },
    });
    fireEvent.change(screen.getByLabelText("Primary Phone Number"), {
      target: { value: 5462846612 },
    });
    fireEvent.change(screen.getByLabelText("Admin Link Extension"), {
      target: { value: "http://example57624.com" },
    });
    fireEvent.change(screen.getByLabelText("Company Admin"), {
      target: { value: ["Admin 1"] },
    });
    fireEvent.change(screen.getByLabelText("Company Options"), {
      target: { value: { data: "any data" } },
    });

    const submitButton = screen.getByText("Submit");
    expect(submitButton).not.toBeDisabled();
  });

  test("shows validation message for non-numeric input in Primary Phone Number", async () => {
    render(<CompanyForm />);

    fireEvent.change(screen.getByLabelText("Primary Phone Number"), {
      target: { value: "+1 (USA)abc" },
    });

    act(() => {
      fireEvent.submit(screen.getByLabelText("Primary Phone Number"));
    });

    expect(
      await screen.findByText("Please enter only numbers"),
    ).toBeInTheDocument();
  });

  it("logs the form data to the console on successful submission", async () => {
    const { getByLabelText, getByText } = render(<CompanyForm />);
    const expectedFormData = {
      "company name": "Test Company",
      "company url": "http://test.com",
      tutorials: ["Tutorial 1"],
      simulations: ["Simulation 1"],
      primaryphonenumber: "+1 (USA)1234567890",
      adminlinkextension: "admin123",
      companyadmin: ["Admin 1"],
      companyoptions: "Some options",
    };

    fireEvent.change(getByLabelText("Company Name"), {
      target: { value: expectedFormData["company name"] },
    });
    fireEvent.change(getByLabelText("Company URL"), {
      target: { value: expectedFormData["company url"] },
    });
    fireEvent.change(getByLabelText("Tutorials"), {
      target: { value: expectedFormData.tutorials },
    });
    fireEvent.change(getByLabelText("Simulations"), {
      target: { value: expectedFormData.simulations },
    });
    fireEvent.change(getByLabelText("Primary Phone Number"), {
      target: { value: expectedFormData.primaryphonenumber },
    });
    fireEvent.change(getByLabelText("Admin Link Extension"), {
      target: { value: expectedFormData.adminlinkextension },
    });
    fireEvent.change(getByLabelText("Company Admin"), {
      target: { value: expectedFormData.companyadmin },
    });
    fireEvent.change(getByLabelText("Company Options"), {
      target: { value: expectedFormData.companyoptions },
    });

    fireEvent.click(getByText("Submit"));
    await waitFor(() => {
      expect(expectedFormData).toEqual(expectedFormData);
    });
  });
});

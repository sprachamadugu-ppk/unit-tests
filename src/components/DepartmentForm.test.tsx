import {   fireEvent, render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import DepartmentEditForm from "./DepartmentForm";
import { BrowserRouter, } from "react-router-dom";
import {  editDepartment, getDepartmentById, sites } from "../api/api-calls";
import { authToken } from "../context/TokenContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn()), }));

jest.mock("../api/api-calls");


const mockData = {
  data: {
    departmentName: "Test Department",
    location: "Test Location",
    departmentadmin: [{ id: "admin1" }],
    sites: [{ id: "site1", name: "Site 1" }],
  },
};

describe("DepartmentEditForm Component", () => {
  beforeEach(() => {
    (sites as any).mockResolvedValue([{ _id: "site1", siteName: "Site 1" }]);
(getDepartmentById as any).mockResolvedValue(mockData);
  });
  const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

  test("renders form fields", async () => {
    render(
      <BrowserRouter>
        <DepartmentEditForm departmentId="testDepartmentId" />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Department Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Department Admin/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Sites/i)).toBeInTheDocument();
    });
  });

  test("updates form fields on input change", async () => {
    render(
      <BrowserRouter>
        <DepartmentEditForm departmentId="testDepartmentId" />
      </BrowserRouter>
    );

    const updatedDepartmentName = "Updated Department";
    const updatedLocation = "Updated Location";

    fireEvent.change(screen.getByLabelText(/Department Name/i), { target: { value: updatedDepartmentName } });
    fireEvent.change(screen.getByLabelText(/Location/i), { target: { value: updatedLocation } });

    expect(screen.getByLabelText(/Department Name/i)).toHaveValue(updatedDepartmentName);
    expect(screen.getByLabelText(/Location/i)).toHaveValue(updatedLocation);
  });

  test("renders form fields with existing values", async () => {
    render(
      <BrowserRouter>
        <DepartmentEditForm departmentId="testDepartmentId" />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/Department Name/i)).toHaveValue(mockData.data.departmentName);
      expect(screen.getByLabelText(/Location/i)).toHaveValue(mockData.data.location);
    
      mockData.data.departmentadmin.forEach((admin) => {
        expect(screen.getByText(admin.id)).toBeInTheDocument();
      });  
      mockData.data.sites.forEach((site) => {
        expect(screen.getByText(site.name)).toBeInTheDocument();
      });    
    });
  });

  test("submits the form and shows success message", async () => {
    render(
      <BrowserRouter>
        <DepartmentEditForm departmentId="testDepartmentId" />
      </BrowserRouter>
    );
  
    (editDepartment as jest.Mock).mockResolvedValueOnce({});
  
    await waitFor(() => {
      fireEvent.click(screen.getByText("Submit"));
    });
  
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith("updated successfully");
    });
    });

    test("handles error while fetching department data", async () => {
      (getDepartmentById as jest.Mock).mockRejectedValue(new Error("Failed to fetch department data"));
  
      render(
        <authToken.Provider value={{ token: 'mockToken' }} >
          <BrowserRouter>
            <DepartmentEditForm departmentId="testDepartmentId" />
          </BrowserRouter>
        </authToken.Provider>
      );  
      await waitFor(() => {
        expect(screen.getByText('Error fetching department data:')).toBeInTheDocument();
      });      
    });

    test("handles error while fetching site names", async () => {
      (sites as jest.Mock).mockRejectedValue(new Error("Failed to fetch site names"));
   
  
  
      render(
        <authToken.Provider value={{ token: 'mockToken' }} >
          <BrowserRouter>
            <DepartmentEditForm departmentId="testDepartmentId" />
          </BrowserRouter>
        </authToken.Provider>
      );
    
      await waitFor(() => {
        expect(screen.getByText('Error fetching site names:')).toBeInTheDocument();
      });
    });
  });


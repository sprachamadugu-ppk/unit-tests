import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "./matchMedia.mock";
import FileUploadForm from "./Csv-form";

describe("FileUploadForm", () => {
  it("renders the form without crashing", () => {
    render(<FileUploadForm onSubmit={jest.fn()} />);
  });

  it("shows an error message for invalid file type", () => {
    render(<FileUploadForm onSubmit={jest.fn()} />);
    fireEvent.change(screen.getByLabelText("File Type"), {
      target: { value: "site file" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    const invalidFile = new File(["file content"], "example.txt", {
      type: "text/plain",
    });
    fireEvent.change(screen.getByLabelText("Upload File"), {
      target: { files: [invalidFile] },
    });

    expect(
      screen.getByText("Invalid file type. Please select a valid CSV file."),
    ).toBeInTheDocument();
  });

  it("shows error messages for required email field", async () => {
    render(<FileUploadForm onSubmit={jest.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Please enter your email!")).toBeInTheDocument();
      expect(
        screen.getByText("Please enter a valid email address!"),
      ).toBeInTheDocument();
    });
  });
});

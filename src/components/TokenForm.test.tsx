import {  fireEvent, render, screen,  waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import AuthToken from "./TokenForm";
import React from "react";

describe("AuthToken", () => {
  test("renders the AuthToken component", () => {
    render(<AuthToken onSubmit={() => {}} />);
    expect(screen.getByText(/Enter Token Here/i)).toBeInTheDocument();
  });

  test("disables the button when token input is empty", () => {
    render(<AuthToken onSubmit={() => {}} />);

    const saveButton = screen.getByText(/Save/i);
    expect(saveButton).toBeDisabled();
  });

  test("enables the button when token input is not empty", () => {
    render(<AuthToken onSubmit={() => {}} />);

    const tokenInput = screen.getByLabelText(/Authorization Token/i);
    const saveButton = screen.getByText(/Save/i);

    userEvent.type(tokenInput, "testToken");

    waitFor(() => {
      expect(saveButton).toBeEnabled();
    });
  });

  test("submits the token on button click", async () => {
    const mockSubmit = jest.fn();
    const contextValue = { token: "" };
  
    jest.spyOn(React, "useContext").mockImplementation(() => contextValue);
  
    render(<AuthToken onSubmit={mockSubmit} />);
  
    const tokenInput = screen.getByLabelText(/Authorization Token/i);
    const saveButton = screen.getByText(/Save/i);
  
    fireEvent.change(tokenInput, { target: { value: "testToken" } });
    fireEvent.click(saveButton);
  
    await screen.findByText("Enter Token Here");
  
    expect(mockSubmit).toHaveBeenCalledWith("testToken");
  
    expect(contextValue.token).toBe("testToken");
  });
  
});

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContextProvider from "./Context-provider";

test("ContextProvider renders AuthTocken and CompanyAddForm", () => {
  render(<ContextProvider />);

  const authTockenInput = screen.getByRole("textbox");
  const authTockenButton = screen.getByRole("button");
  const companyAddForm = screen.getByRole("textbox");

  expect(authTockenInput).toBeInTheDocument();
  expect(authTockenButton).toBeInTheDocument();
  expect(companyAddForm).toBeInTheDocument();
});

test("ContextProvider handles token submission and updates CompanyAddForm", () => {
  render(<ContextProvider />);

  const authTockenInput = screen.getByRole("textbox");
  const authTockenButton = screen.getByRole("button");
  const companyAddForm = screen.getByRole("textbox") as HTMLInputElement;

  fireEvent.change(authTockenInput, { target: { value: "testToken" } });
  fireEvent.click(authTockenButton);

  expect(companyAddForm.value).toBe("testToken");
});

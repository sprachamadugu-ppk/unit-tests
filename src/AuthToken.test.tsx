import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthTocken from "./AuthToken";

test("AuthTocken component renders correctly", () => {
  render(<AuthTocken onSubmit={() => {}} />);
  const inputElement = screen.getByRole("textbox");
  const buttonElement = screen.getByRole("button");

  expect(inputElement).toBeInTheDocument();
  expect(buttonElement).toBeInTheDocument();
});

test("AuthTocken handles input change", () => {
  const mockSubmit = jest.fn();
  render(<AuthTocken onSubmit={mockSubmit} />);
  const inputElement = screen.getByRole("textbox") as HTMLInputElement;

  fireEvent.change(inputElement, { target: { value: "testToken" } });

  expect(inputElement.value).toBe("testToken");
});

test("AuthTocken calls onSubmit with correct token on submit", () => {
  const mockSubmit = jest.fn();
  render(<AuthTocken onSubmit={mockSubmit} />);
  const inputElement = screen.getByRole("textbox");
  const buttonElement = screen.getByRole("button");

  fireEvent.change(inputElement, { target: { value: "testToken" } });
  fireEvent.click(buttonElement);

  expect(mockSubmit).toHaveBeenCalledWith("testToken");
});

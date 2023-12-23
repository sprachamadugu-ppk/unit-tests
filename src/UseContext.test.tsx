import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { authTocken } from "./Create-context";
import CompanyAddForm from "./UseContext";

test("CompanyAddForm renders input when tocken is truthy", () => {
  render(
    <authTocken.Provider value={{ tocken: "testToken" }}>
      <CompanyAddForm />
    </authTocken.Provider>,
  );

  const inputElement = screen.getByRole("textbox") as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.value).toBe("testToken");
});

test("CompanyAddForm does not render input when tocken is falsy", () => {
  render(
    <authTocken.Provider value={{ tocken: "" }}>
      <CompanyAddForm />
    </authTocken.Provider>,
  );

  const inputElement = screen.queryByRole("textbox");
  expect(inputElement).not.toBeInTheDocument();
});

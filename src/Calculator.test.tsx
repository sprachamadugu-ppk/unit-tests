import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calculator from "./Calculator";

describe("Calculator Component", () => {
  test("renders Calculator component", () => {
    render(<Calculator />);
    expect(screen.getByText("Calculator")).toBeInTheDocument();
  });

  test.each([
    { num1: 1, num2: 1, expectedResult: "Result: 2.00" },
    { num1: -1, num2: -2, expectedResult: "Result: -3.00" },
    { num1: -2, num2: 1, expectedResult: "Result: -1.00" },
    { num1: 0, num2: 1, expectedResult: "Result: 1.00" },
  ])(
    "performs addition with $num1 and $num2",
    ({ num1, num2, expectedResult }) => {
      render(<Calculator />);

      fireEvent.change(screen.getByLabelText("Number 1"), {
        target: { value: num1.toString() },
      });
      fireEvent.change(screen.getByLabelText("Number 2"), {
        target: { value: num2.toString() },
      });
      fireEvent.click(screen.getByText("Add"));

      expect(screen.getByText(expectedResult)).toBeInTheDocument();
    },
  );

  test.each([
    { num1: 4, num2: 3, expectedResult: "Result: 1.00" },
    { num1: -1, num2: -2, expectedResult: "Result: 1.00" },
    { num1: -2, num2: 1, expectedResult: "Result: -3.00" },
    { num1: 0, num2: 1, expectedResult: "Result: -1.00" },
  ])(
    "performs Subtraction with $num1 and $num2",
    ({ num1, num2, expectedResult }) => {
      render(<Calculator />);

      fireEvent.change(screen.getByLabelText("Number 1"), {
        target: { value: num1.toString() },
      });
      fireEvent.change(screen.getByLabelText("Number 2"), {
        target: { value: num2.toString() },
      });
      fireEvent.click(screen.getByText("Subtract"));

      expect(screen.getByText(expectedResult)).toBeInTheDocument();
    },
  );

  test.each([
    { num1: 6, num2: 3, expectedResult: "Result: 2.00" },
    { num1: -8, num2: 2, expectedResult: "Result: -4.00" },
    { num1: 0, num2: 5, expectedResult: "Result: 0.00" },
    { num1: -8, num2: -2, expectedResult: "Result: 4.00" },
  ])(
    "performs division with $num1 and $num2",
    ({ num1, num2, expectedResult }) => {
      render(<Calculator />);

      fireEvent.change(screen.getByLabelText("Number 1"), {
        target: { value: num1.toString() },
      });
      fireEvent.change(screen.getByLabelText("Number 2"), {
        target: { value: num2.toString() },
      });
      fireEvent.click(screen.getByText("Divide"));

      expect(screen.getByText(expectedResult)).toBeInTheDocument();
    },
  );

  test.each([
    { num1: 4, num2: 5, expectedResult: "Result: 20.00" },
    { num1: 0, num2: 7, expectedResult: "Result: 0.00" },
    { num1: -3, num2: 6, expectedResult: "Result: -18.00" },
    { num1: -2, num2: -4, expectedResult: "Result: 8.00" },
    { num1: 1, num2: 1.5, expectedResult: "Result: 1.50" },
  ])(
    "performs multiplication with $num1 and $num2",
    ({ num1, num2, expectedResult }) => {
      render(<Calculator />);

      fireEvent.change(screen.getByLabelText("Number 1"), {
        target: { value: num1.toString() },
      });
      fireEvent.change(screen.getByLabelText("Number 2"), {
        target: { value: num2.toString() },
      });
      fireEvent.click(screen.getByText("Multiply"));

      expect(screen.getByText(expectedResult)).toBeInTheDocument();
    },
  );

  test("handles invalid input for division operation", () => {
    render(<Calculator />);

    fireEvent.change(screen.getByLabelText("Number 1"), {
      target: { value: "10" },
    });
    fireEvent.change(screen.getByLabelText("Number 2"), {
      target: { value: "0" },
    });
    fireEvent.click(screen.getByText("Divide"));

    expect(
      screen.getByText(/Result: (Infinity|Invalid input)/),
    ).toBeInTheDocument();
  });

  test('handles empty input and sets result to "Invalid input"', () => {
    render(<Calculator />);

    fireEvent.change(screen.getByLabelText("Number 1"), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText("Number 2"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByText("Add"));

    expect(screen.getByText("Result: Invalid input")).toBeInTheDocument();
  });
});

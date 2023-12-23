import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MyComponent from "./Sum";

test("renders NumberAdder with an array of numbers", () => {
  const numbers = [1, 2, 3, 4, 5];
  render(<MyComponent numbers={numbers} />);

  const sumElement = screen.getByText(/Sum of numbers:/i);
  expect(sumElement).toBeInTheDocument();

  const sumValue = parseInt(
    sumElement.textContent?.replace("Sum of numbers: ", "") || "0",
    10,
  );
  expect(sumValue).toBe(15);
});

test("renders NumberAdder with -ve and +ve numbers", () => {
  const numbers = [-1, -2, 3, 4, -5];

  render(<MyComponent numbers={numbers} />);

  expect(screen.getByText("Sum of numbers: -1")).toBeInTheDocument();
});

test("render NumberAdder with empty array ", () => {
  const numbers: number[] = [];
  render(<MyComponent numbers={numbers} />);
  expect(screen.getByText("Sum of numbers: 0")).toBeInTheDocument();
});

test("renders NumverAdder with -ve number", () => {
  const numbers = [-2, -3, -4, -5];
  render(<MyComponent numbers={numbers} />);
  expect(screen.getByText("Sum of numbers: -14")).toBeInTheDocument();
});

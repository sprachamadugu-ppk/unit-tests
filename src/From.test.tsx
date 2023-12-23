import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SimpleForm from "./Form";

test("renders the form and submits it", async () => {
  const onSubmit = jest.fn();

  const { getByLabelText, getByText } = render(
    <SimpleForm onSubmit={onSubmit} />,
  );

  fireEvent.change(getByLabelText(/name/i), { target: { value: "John" } });
  fireEvent.change(getByLabelText(/email/i), {
    target: { value: "john@example.com" },
  });

  fireEvent.click(getByText(/submit/i));

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      name: "John",
      email: "john@example.com",
    });
  });
});

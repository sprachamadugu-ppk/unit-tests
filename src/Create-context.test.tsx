import React, { useContext } from "react";
import { render } from "@testing-library/react";
import { authTocken } from "./Create-context";

const TestComponent: React.FC = () => {
  const contextValue = useContext(authTocken);
  return <div data-testid="context-value">{contextValue.tocken}</div>;
};

test("authTocken context has correct initial value", () => {
  const { getByTestId } = render(
    <authTocken.Provider value={{ tocken: "testToken" }}>
      <TestComponent />
    </authTocken.Provider>,
  );

  const contextValueElement = getByTestId("context-value");
  expect(contextValueElement.textContent).toBe("testToken");
});

import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Choose what game you'd like to play/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";
import userEvent from "@testing-library/user-event";

/*
 * Code Along - explore the testing methodology of arrange, act and assert.
 */
it("should render the form", () => {
  // 1. Arrange
  render(<Form />);

  // 2. Act
  const form = screen.getByRole("form");

  // 3. Assert
  expect(form).toBeInTheDocument();
});

/*
 * Code Along - explore getBy... and getAllBy... and assertions expect()...
 */
it("should render the basic input fields", () => {
  render(<Form />);

  // getBy...
  // -> ONLY SINGLE NODE
  // -> ERROR IF MULTIPLES / DOESN'T GET ONE
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByPlaceholderText(/e.g. test@test.com/i);

  // expect and matcher's
  expect(emailInput).toBeInTheDocument();
  expect(nameInput).toBeTruthy();

  // getAllBy...
  // -> MULTIPLE NODES
  // -> ERROR IF IT DOESN'T GET ONE
  const inputs = screen.getAllByRole("textbox");
  inputs.forEach(input => {
    expect(input).toBeInTheDocument();
  });
});

/*
 * Code Along - explore queryBy... and assertions expect()...
 */
it("should not render the error message on load", () => {
  render(<Form />);

  // queryBy...
  // -> ONLY SINGLE NODE
  // -> ERROR IF MULTIPLES / NULL IF IT DOESN'T GET ONE
  const errorMessage = screen.queryByText(/Sorry something went wrong/i);

  // expect and matcher's
  // .not
  // .toBeFalsy
  expect(errorMessage).not.toBeInTheDocument();
  expect(errorMessage).toBeFalsy();
});

/*
 * Mini Challenge
 */
it("should not render the success message on load", () => {
  render(<Form />);

  const errorMessage = screen.queryByText(/Thank you for submitting/i);

  expect(errorMessage).toBeFalsy();
});

/*
 * Code Along - Check the screen shows a 'Something went wrong' message
 */
it("should not submit the form with invalid credentials and show warnings", () => {
  // 1. Arrange
  render(<Form />);

  // 2. Act
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  userEvent.type(nameInput, "");

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInput, "notvalidemail");

  userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  // 3. Assert
  const alert = screen.getByText("Sorry something went wrong");
  expect(alert).toBeTruthy();

  // NOTE: Below we are using queryBy selector.. Why? Because it does NOT throw an error if it's there
  //       where as getByText() does. For more information, checkout.. https://testing-library.com/docs/queries/about for more info
  const success = screen.queryByText(/Thank you for submitting/i);
  expect(success).toBeFalsy();
});

/*
 * CHALLENGE: Check the screen shows "Thank you for submitting" when valid credentials are input
 */
it("should submit the form when valid credentials are input", () => {
  // 1. Arrange
  render(<Form />);

  // 2. Act
  const nameInput = screen.getByRole("textbox", { name: /name/i });
  userEvent.type(nameInput, "John Doe");

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInput, "john@gmail.com");

  userEvent.click(screen.getByRole("button", { name: /Sign In/i }));

  // 3. Assert
  const alert = screen.queryByText(/Sorry something went wrong/i);
  expect(alert).toBeFalsy();
  const success = screen.getByText(/Thank you for submitting/i);
  expect(success).toBeTruthy();
});

import { getElementError, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

// render returns object with a container
// Cheap and quick testing method
it("should match form component snapshot", ()=>{
  const {container} = render(<Form />);
  expect(container).toMatchSnapshot();
})

it("should render form", () => {
  // 1. Arrange (react specific)
  render(<Form />);
  // 2. Act (react specific)
  const form = screen.getByRole("form");
  // 3. Assert
  // below test checks that the element is physically there
  expect(form).toBeInTheDocument();
});

it("Should render all input fields", () => {
  // 1. Arrange
  render(<Form />);
  // 2. Act
  const nameInput = screen.getByLabelText("Name");
  const emailInput = screen.getByLabelText("Email");
  const inputs = screen.getAllByRole("textbox");
  // 3. Assert
  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeTruthy();

  inputs.forEach((input) => {
    expect(input).toBeInTheDocument();
  });
});

it("Should not display error message when loading the form", () => {
  // 1. Arrange
  render(<Form />);
  // 2. Act
  // Have to use query by as falsy
  const errorMessage = screen.queryByLabelText("Sorry something went wrong");
  // 3. Assert
  expect(errorMessage).toBeFalsy();
});

it("should not display success message when loading the form", () => {
  // 1. Arrange
  render(<Form />);
  // 2. Act
  // Have to use query by as falsy
  const successMessage = screen.queryByLabelText(
    "Thank you for submitting! We'll be in touch"
  );
  // 3. Assert
  expect(successMessage).toBeFalsy();
});

it("should not submit form with invalid details, it should show a warning", () => {
  render(<Form />);
  const nameInput = screen.getByText("Name");
  const emailInput = screen.getByText("Email");
  const button = screen.getByRole("button");

  // using userEvent - this simulates a user input event

  userEvent.type(nameInput, "");
  userEvent.type(emailInput, "Paul");
  userEvent.click(button);
  // should use getBy as it will actually error if it fails the test
  const errorMessage = screen.getByText("Sorry something went wrong");
  const successMessage = screen.queryByLabelText(
    "Thank you for submitting! We'll be in touch"
  );
  // Make assertions
  expect(errorMessage).toBeInTheDocument();
  expect(successMessage).not.toBeInTheDocument();
});

// ### Challenge

// Check the screen shows "Thank you for submitting" when valid credentials are input.

it("should display the success message upon valid input", () => {
  render(<Form />);

  const nameInput = screen.getByText("Name");
  const emailInput = screen.getByText("Email");
  const button = screen.getByRole("button");

  userEvent.type(nameInput, "Paul Hardman");
  userEvent.type(emailInput, "Paul@Hardman.com");
  userEvent.click(button);

  const successMessage = screen.getByText(
    "Thank you for submitting! We'll be in touch"
  );
  const errorMessage = screen.queryByLabelText("Sorry something went wrong");

  // Assertions
  expect(successMessage).toBeInTheDocument();
  expect(errorMessage).not.toBeInTheDocument();
  // Same thing
  expect(errorMessage).toBeFalsy();
});

# React Testing Library

This repo is focused on getting the student use to using React testing library for Unit testing components.

### Resources

- [Slides](https://opusrs.sharepoint.com/:p:/r/sites/Nologyio/_layouts/15/Doc.aspx?sourcedoc=%7B9841e2f8-0a9d-43ce-a495-5ab107a674df%7D&action=edit&wdPreviousSession=4381b364-9c78-65d8-3182-a6a7cf444be0)
- [Github plan.md](https://github.com/nology-tech/react-testing-library-lesson/blob/main/notes/plan.md)
- [React Testing library Docs](https://testing-library.com/)
- [Jest](https://jestjs.io/)

### Objectives

- Understand different types of tests
- React Testing Library Mindset
- Writing simple component Unit tests
- Testing User Interaction

---

## Understand different types of tests

Talk through the slides and talk through different types of tests.

### Unit test

A way of testing a unit - the smallest piece of code that can be logically isolated in a system.

You could test a:

- A Function
- A Class
- A Component

### Integration Test

A way of testing groups of units - is to test whether many separately developed units work together as expected.

This could be interaction between:

- Your front end and back end
- Containers and Component
- Components inside Components

### End to End

A way of testing a application - this involves testing an application's workflow from beginning to end as if you were a user.

This could be different user flows:

- User signs up
- User adds item to cart then checkouts

---

## React Testing Library Mindset

React Testing library gives you utilities that encourage you to write tests that closely resemble how your web pages are used.

> The more your tests resemble the way your software is used, the more confidence they can give you.

Give them the documentation.

Show the students the dependencies and scripts in the package.json.

If you use the `npx create-react-app` command to create a react project it will come with jest and react testing library dependencies already added to the project.

You will already have a `test` script which you can run to execute jest + react testing library.

The command to run the tests is `npm test` or `npm run test`

```json
// package.json
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-scripts": "4.0.3",
    "web-vitals": "^1.0.1"
  },"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```

---

## Writing simple component Unit tests

Talk through the repo and demonstrate the functionality of the Form component.

Create a Form.test.js and import the functions and component you will need to write out the first tests.

```js
// Form.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
```

### Recap test syntax and methodology

Go through a simple element will render test using Arrange, Act and Assert.

```js
// Form.test.js
it("should render the form", () => {
  // 1. Arrange
  render(<Form />);

  // 2. Act
  const form = screen.getByRole("form");

  // 3. Assert
  expect(form).toBeInTheDocument();
});
```

### getBy..., getAllBy... and queryBy...

Focusing on getting elements. A break down of the different ways of getting elements is below.

<img src="./images/matches.PNG" >

Use getBy... to get a single input then use expect to check it is in the document.

Use getByAll to get multiple inputs and check they are in the document.

Use queryBy... to check that the error message is not in the document on load.

```js
// Form.test.js
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
```

### Mini Challenge

Write a test to check that the success message is NOT there on load.

Solution

```js
// Form.test.js
it("should not render the success message on load", () => {
  render(<Form />);

  const errorMessage = screen.queryByText(/Thank you for submitting/i);

  expect(errorMessage).toBeFalsy();
});
```

---

## Testing User Interaction

Move onto a more complicated test that needs user interaction.

Test the component displays the error message if it has been given the wrong inputs. Use the userEvent to mimic typing and clicking.

```js
// Form.test.js
/*
 * Code Along - Check the screen shows a 'Something went wrong' message
 */
it("should not submit the form with invalid credentials and show warnings", () => {
  render(<Form />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  userEvent.type(nameInput, "");

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInput, "notvalidemail");

  const button = screen.getByRole("button", { name: /Sign In/i });
  userEvent.click(button);

  const alert = screen.getByText("Sorry something went wrong");
  expect(alert).toBeTruthy();

  const success = screen.queryByText(/Thank you for submitting/i);
  expect(success).toBeFalsy();
});
```

### Challenge

Check the screen shows "Thank you for submitting" when valid credentials are input.

Solution

```js
// Form.test.js
it("should submit the form when valid credentials are input", () => {
  render(<Form />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  userEvent.type(nameInput, "John Doe");

  const emailInput = screen.getByRole("textbox", { name: /email/i });
  userEvent.type(emailInput, "john@gmail.com");

  const button = screen.getByRole("button", { name: /Sign In/i }
  userEvent.click(button));

  const alert = screen.queryByText(/Sorry something went wrong/i);
  expect(alert).toBeFalsy();
  const success = screen.getByText(/Thank you for submitting/i);
  expect(success).toBeTruthy();
});
```

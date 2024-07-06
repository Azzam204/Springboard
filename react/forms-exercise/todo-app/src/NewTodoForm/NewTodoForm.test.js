import { render } from "@testing-library/react"
import NewTodoForm from "./NewTodoForm"

// Smoke test

it('renders without crashing', function () {
  render(
    <NewTodoForm />
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <NewTodoForm />
  );
  expect(asFragment()).toMatchSnapshot();
});
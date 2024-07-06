import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import TodoList from "./TodoList"
import { validate } from "uuid";

// Smoke test

it('renders without crashing', function () {
  render(
    <TodoList />
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <TodoList />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("can add a new todo", function () {
  const { queryByPlaceholderText, queryByText } = render(<TodoList />);

  expect(queryByText('New Task')).not.toBeInTheDocument();

  const taskInput = queryByPlaceholderText('Todo');
  const submitBtn = queryByText('Add Todo!');

  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.click(submitBtn)

  expect(queryByText("New Task")).toBeInTheDocument();
})

it("can remove a todo", function () {
  const { queryByPlaceholderText, queryByText } = render(<TodoList />);

  expect(queryByText('New Task')).not.toBeInTheDocument();

  const taskInput = queryByPlaceholderText('Todo');
  const submitBtn = queryByText('Add Todo!');

  fireEvent.change(taskInput, { target: { value: 'New Task' } });
  fireEvent.click(submitBtn)

  expect(queryByText("New Task")).toBeInTheDocument();

  const delBtn = queryByText('x');

  fireEvent.click(delBtn);

  expect(queryByText('New Task')).not.toBeInTheDocument();
})
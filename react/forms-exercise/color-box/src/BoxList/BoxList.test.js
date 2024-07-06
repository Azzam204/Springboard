import { fireEvent, render } from "@testing-library/react"
import '@testing-library/jest-dom'
import BoxList from "./BoxList"

// Smoke test

it('renders without crashing', function () {
  render(
    <BoxList />
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <BoxList />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("can add a new box", function () {
  const { queryByPlaceholderText, queryByText } = render(<BoxList />);

  expect(queryByText('x')).not.toBeInTheDocument();

  const colorInput = queryByPlaceholderText("Box color");
  const heightInput = queryByPlaceholderText("Box height");
  const widthInput = queryByPlaceholderText("Box width");
  const submitBtn = queryByText("Add Box!")

  fireEvent.change(colorInput, { target: { value: 'red' } });
  fireEvent.change(heightInput, { target: { value: '100' } });
  fireEvent.change(widthInput, { target: { value: '100' } });
  fireEvent.click(submitBtn);

  expect(queryByText('x')).toBeInTheDocument();

})


it("can remove a box", function () {
  const { queryByPlaceholderText, queryByText } = render(<BoxList />);

  expect(queryByText('x')).not.toBeInTheDocument();

  const colorInput = queryByPlaceholderText("Box color");
  const heightInput = queryByPlaceholderText("Box height");
  const widthInput = queryByPlaceholderText("Box width");
  const submitBtn = queryByText("Add Box!");

  fireEvent.change(colorInput, { targer: { value: 'red' } });
  fireEvent.change(heightInput, { target: { value: '100' } });
  fireEvent.change(widthInput, { target: { value: '100' } });
  fireEvent.click(submitBtn);

  expect(queryByText('x')).toBeInTheDocument();

  const delBtn = queryByText('x');

  fireEvent.click(delBtn);

  expect(queryByText('x')).not.toBeInTheDocument();

})
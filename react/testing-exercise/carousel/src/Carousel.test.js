import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
import Carousel from "./Carousel.js";
import TEST_IMAGES from "./_testCommon.js";


// smoke test

it("renders without crashing", function () {
  render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  )
})

it("matches snapshot", function () {
  const { asFragment } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  expect(asFragment()).toMatchSnapshot();
})

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


it('works when you click on the left arrow', function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  ); 


// expect first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  const rightArrow = container.querySelector(".bi-arrow-right-circle");

  // click on right arrow

  fireEvent.click(rightArrow);

// expect second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();

// click on left arrow
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

// expect first image to show, but not second
  expect(
    container.querySelector(`img[alt="testing image 1"]`)).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
});


it("hides left arrow on first image and hides right arrow on last image", function () {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  let leftArrow = container.querySelector(".bi-arrow-left-circle")

// expect first image to show, but not second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // While first image is showing, expect right arrow to show but not left arrow
  expect(rightArrow).toBeInTheDocument();
  expect(leftArrow).not.toBeInTheDocument();

  // move on to last image
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  leftArrow = container.querySelector(".bi-arrow-left-circle")

  // while last image is showing, expect left arrow to show but not right arrow
  expect(leftArrow).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();

})

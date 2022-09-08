import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it('should render a Carousel', () => {
    render(<Carousel />)
})

it('should match snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

it('works when you click on the left arrow', () => {
  const { getByText, getByTestId, queryByAltText } = render(<Carousel />);
  const leftArrow = getByTestId('left-arrow');
  const rightArrow = getByTestId('right-arrow');
  //expect the first image to show
  expect(getByText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  //click right arrow
  fireEvent.click(rightArrow);

  // move back to the left, expect the first image to show
  fireEvent.click(leftArrow);
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})

it("hides and shows arrows appropriately", () => {
  const {getByTestId} = render(<Carousel />);
  const leftArrow = getByTestId('left-arrow');
  const rightArrow = getByTestId('right-arrow');

  // expect the left arrow to be missing
  expect(leftArrow).toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward, expect both arrow to exist
  fireEvent.click(getByTestId("right-arrow"));
  // expect the left arrow to be missing, but the right button to be present.
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).not.toHaveClass("hidden");

  // move forward again, expect only the right arrow to be missing
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");
  expect(rightArrow).toHaveClass("hidden");
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

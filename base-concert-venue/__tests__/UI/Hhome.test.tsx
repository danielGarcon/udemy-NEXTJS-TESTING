import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'; // for the toBeInTheDocument matcher
import Home from "../../pages/index";

describe('static page', () => {
  test("page has correct heading and image", async () => {
    render(<Home />);
    const heading = await screen.findByRole('heading', { name: 'Welcome to Popular Concert Venue' });
    expect(heading).toBeInTheDocument();

    // identify image by its alt text
    const image = screen.getByRole('img', { name: 'Concert goer with hands in the shape of a heart'})
    expect(image).toBeInTheDocument()
    // console log the word hello
  });
});
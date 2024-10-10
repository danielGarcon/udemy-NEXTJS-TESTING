import { render, screen } from "@testing-library/react";

import BandComponent from "@/pages/bands/[bandId]";

import { readFakeData } from "../__mocks__/fakeData";

describe("BandComponent", () => {
  test("displays the correct band info", async () => {
    const { fakeBands } = await readFakeData();
    render(<BandComponent band={fakeBands[0]} error={null} />);

    const heading = screen.getByRole("heading", /the wandering bunnies/i);
    expect(heading).toBeInTheDocument();
  });

  test("that error shows when problem with the band data", () => {
    render(
      <BandComponent
        band={null}
        error="There was a problem loading the band data"
      />
    );
    const error = screen.getByText(
      /could not retrieve band data: there was a problem loading the band data/i
    );
    expect(error).toBeInTheDocument();
  });
});

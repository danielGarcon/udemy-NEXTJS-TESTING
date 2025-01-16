// setupTests.ts
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect"; // for the toBeInTheDocument matcher

import { render, screen } from "@testing-library/react";

import { UserReservations } from "../../../components/user/UserReservations";

describe("UserReservations", () => {
  test("shows the correct number of reservations", async () => {
    render(<UserReservations userId={1} />);
    const purchaseButton = await screen.findByRole("button", {
      name: /purchase/i,
    });
    expect(purchaseButton).toBeInTheDocument();

    const ticketsHeading = screen.queryByRole("heading", {
      name: /your tickets/i,
    });
    expect(ticketsHeading).toBeInTheDocument();
  });

  test("displays no reservation and purchase button when no reservations are found", async () => {
    // there are no reservations for userId 0
    // so we should expect to see the purchase button
    // and no reservations listed
    render(<UserReservations userId={0} />);
    // const noReservationsText = await screen.findByText(/no reservations found/i);
    // expect(noReservationsText).toBeInTheDocument();
    const purchaseButton = await screen.findByRole("button", {
      name: /purchase tickets/i,
    });
    expect(purchaseButton).toBeInTheDocument();

    const ticketsHeading = screen.queryByRole("heading", {
      name: /your tickets/i,
    });
    expect(ticketsHeading).not.toBeInTheDocument();
    screen.debug();
  });
});

import { render, screen } from "@testing-library/react";

import { UserReservations } from "@/components/user/userReservations";

describe("UserReservations", () => {
  test("shows the correct number of reservations", async () => {
    render(<UserReservations userId={1}  />);
    const purchaseButton = await screen.findByRole("button", {
      name: /purchase/i,
    });
    expect(purchaseButton).toBeInTheDocument();
  });

  // test('displays no reservation and purchase button when no reservations are found', async () => {
  //   render(<UserReservations userId={0} />);
  //   const noReservationsText = await screen.findByText(/no reservations found/i);
  //   expect(noReservationsText).toBeInTheDocument();

  //   const purchaseButton = await screen.findByRole('button', { name: /purchase/i });
  //   expect(purchaseButton).toBeInTheDocument();
  // })
});

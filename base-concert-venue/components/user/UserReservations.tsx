import { Button, Heading, List } from "@chakra-ui/react";
import Link from "next/link";
import useSWR from "swr";

import { QueryError } from "@/components/_common/QueryError";
import { UserReservation } from "@/components/user/UserReservation";
import { axiosInstance } from "@/lib/axios/axiosInstance";
import { routes } from "@/lib/axios/routes";
import type { ReservationWithShow } from "@/lib/features/reservations/types";

import { LoadingSpinner } from "../_common/LoadingSpinner";

const getUserReservations = async (
  userId?: number,
  seatCount?: number
): Promise<Array<ReservationWithShow> | null> => {
  if (!userId && typeof userId !== "number") return Promise.resolve(null);
  const url = `/api/${routes.users}/${userId}/reservations`;
  console.log("Request URL:", url); // Log the request URL
  const data = await axiosInstance.get<
    null,
    { data: { userReservations: Array<ReservationWithShow> } }
  >(`/api/${routes.users}/${userId}/reservations`);
  // const data = {
  //   data: {
  //     userReservations: [
  //       {
  //         userId: 0,
  //         show: {
  //           band: {
  //             name: "The Band",
  //           },
  //           scheduledAt: "2022-12-31T23:59:59.999Z",
  //           availableSeatCount: seatCount,
  //         },
  //         reservedSeatCount: seatCount,
  //       },
  //     ],
  //   },
  // };
  return data.data.userReservations;
};

export const UserReservations = ({ userId, seatCount }: { userId: number, seatCount: number }) => {
  const {
    data: userReservations,
    error,
    isValidating,
  } = useSWR(`user/${userId}/reservations`, () => getUserReservations(userId, seatCount), {
    fallbackData: [],
  });

  if (error)
    return (
      <QueryError
        message={`could not retrieve reservations: ${error?.message}`}
      />
    );

  if (isValidating) return <LoadingSpinner display />;

  if (!userReservations || userReservations.length === 0)
    return (
      <Link href="/shows" passHref>
        <Button mt={10}>Purchase tickets</Button>
      </Link>
    );

  return (
    <>
      <Heading mt={10}>Your Tickets</Heading>
      <List mt={5}>
        {userReservations.map((reservation) => (
          <UserReservation key={reservation.id} reservation={reservation} />
        ))}
      </List>
      <Link href="/shows" passHref>
        <Button mt={10}>Purchase more tickets</Button>
      </Link>
    </>
  );
};

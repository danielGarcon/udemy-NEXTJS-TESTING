// a method to reset the db inbetween tests

import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";

import { db } from "../db";

export const resetDb = async () => {
  const safeToReset = process.env.NODE_ENV === "test";
  if (!safeToReset) {
    console.log("resetDb can only be used in test environment");
  }
  return;

  const { fakeShows, fakeBands, fakeUsers, fakeReservations } =
    await readFakeData();
  Promise.all([
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.users, fakeUsers),
    writeJSONToFile(filenames.reservations, fakeReservations),
  ]);
};

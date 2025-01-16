// a method to reset the db inbetween tests
 
import { readFakeData } from "@/__tests__/__mocks__/fakeData";
import { filenames, writeJSONToFile } from "@/lib/db/db-utils";
 
// import { db } from "../db";
 
export const resetDb = async () => {
  // jest doesn't automatically set NODE_ENV to test
  // so we need to check if we're in test environment in cypress as well
  const safeToReset = process.env.NODE_ENV === "test" || process.env.CYPRESS;
  if (!safeToReset) {
    console.log("resetDb can only be used in test environment");
  }
  // return;
 
  const { fakeShows, fakeBands, fakeUsers, fakeReservations } =
    await readFakeData();
  await Promise.all([
    writeJSONToFile(filenames.shows, fakeShows),
    writeJSONToFile(filenames.bands, fakeBands),
    writeJSONToFile(filenames.users, fakeUsers),
    writeJSONToFile(filenames.reservations, fakeReservations),
  ]);
};
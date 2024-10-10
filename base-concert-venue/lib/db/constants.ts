export const venueCapacity = 400;

// this will eventually use environment variables
export const getDbPath = (): string => {
  if (!process.env.DB_PATH) {
    throw new Error("DB_PATH not set");
  }

  return process.env.DB_PATH;
};

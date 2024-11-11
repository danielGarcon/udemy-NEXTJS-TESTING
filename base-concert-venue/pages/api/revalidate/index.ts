import type { NextApiRequest, NextApiResponse } from "next";

import { createHandler } from "../../../lib/api/handler";

const handler = createHandler();
// it is aasync becasue the revalidate calls are async
handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log("process.env.APP_ENV:", process.env.APP_ENV);
  console.log(
    "process.env.REVALIDATION_SECRET:",
    process.env.REVALIDATION_SECRET
  );
  console.log("Received secret:", req.query.secret);
  if (process.env.APP_ENV !== "test") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    // Add console logs for debugging
    const secret = process.env.REVALIDATION_SECRET;

    console.log("Server REVALIDATION_SECRET:", secret);
    console.log("Received secret:", req.query.secret);

    return res.status(401).json({ message: "Unauthorizedd" });
  }

  await res.revalidate("/shows");
  await res.revalidate("/bands");
  return res.status(200).end();
});
export default handler;

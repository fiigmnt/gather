import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      return res.status(200).json({
        channelName: "member-curated",
        emoji: "📰",
        reactionCount: 5,
        rewardAmount: 5,
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }
};

export default handler;

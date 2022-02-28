import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (req.method === "POST") {
    try {
      const { id, emoji, reactionCount, rewardAmount } = req.body;

      //   cast rewardAmount to number
      const rC = Number(reactionCount);
      const rA = Number(rewardAmount);
      if (emoji && reactionCount && rewardAmount) {
        await prisma.server.update({
          where: {
            id: id,
          },
          data: {
            emoji,
            reactionCount: rC,
            rewardAmount: rA,
          },
        });
        return res.status(200).json({ success: true });
      } else {
        console.error(`Missing data for server: ${req.body}.`);
        return res.status(500).end();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  } else if (req.method === "GET") {
    try {
      const server = await prisma.server.findFirst({
        where: {
          discordId: session?.user?.id,
        },
        include: {
          curatedChannel: true,
        },
      });
      const { id, emoji, reactionCount, rewardAmount } = server;
      return res.status(200).json({
        id,
        channelName: server.curatedChannel.name,
        emoji,
        reactionCount,
        rewardAmount,
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }
};

export default handler;

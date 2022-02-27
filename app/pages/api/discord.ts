import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ResponseData {
  channelId: string;
  emoji: string;
  reactionCount: number;
  rewardAmount: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method === "POST") {
    try {
      const { discordId } = req.body;

      if (discordId) {
        // find username based on discord server id
        const server = await prisma.server.findFirst({
          where: {
            discordId,
          },
          include: {
            curatedChannel: true,
          },
        });
        
        if (
          server?.curatedChannel?.discordId &&
          server.emoji &&
          server.reactionCount &&
          server.rewardAmount
        ) {
          const { emoji, reactionCount, rewardAmount } = server;
          return res.status(200).json({
            channelId: server.curatedChannel.discordId,
            emoji,
            reactionCount,
            rewardAmount,
          });
        } else {
          console.error(`Missing data for server: ${discordId}.`);
          console.log(
            `emoji: ${server?.emoji}\nreactionCount: ${server?.reactionCount}\nrewardAmount: ${server?.rewardAmount}`
          );
          return res.status(500);
        }
      } else {
        console.error(`Discord server not found: ${discordId}`);
        return res.status(500);
      }
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }
};

export default handler;

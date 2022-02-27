import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestData {
  username: string;
  server: {
    id: string;
    name: string;
  };
  curateChannel: {
    id: string;
    name: string;
  };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const request: RequestData = req.body;
      const { username, server, curateChannel } = request;

      if (server?.id && curateChannel?.id) {
        // find username based on discord server id
        const channel = await prisma.channel.create({
          data: {
            discordId: curateChannel.id,
            name: curateChannel.name,
          },
        });

        const user = await prisma.user.findFirst({
          where: {
            name: username,
          },
        });

        if (channel && user) {
          await prisma.server.create({
            data: {
              userId: user.id,
              discordId: server.id,
              name: server.name,
              channelId: channel.id,
            },
          });
          res.status(200);
        } else {
          console.error(`Could not create channel: ${request}.`);
          return res.status(500);
        }
      } else {
        console.error(`Discord server not found: ${server}`);
        return res.status(500);
      }
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  }
};

export default handler;

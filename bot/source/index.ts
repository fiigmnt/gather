import { Client, Intents, TextChannel } from "discord.js";
import axios from "axios";

import * as dot from "dotenv";
dot.config();

const { DISCORD_TOKEN } = process.env;

const API = "http://localhost:8080/api";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.once("ready", () => {
  console.log("Bot is ready");
});

interface Response {
  channelId: string;
  emoji: string;
  reactionCount: number;
}

client.on("messageReactionAdd", async (ReactionEmoji) => {
  const reaction = ReactionEmoji;
  try {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      await reaction.fetch();
    }

    console.log(reaction);

    const response: Response = (
      await axios.post(`${API}/discord`, {
        discordId: reaction.message.guildId,
      })
    ).data;

    if (response.channelId) {
      // check reaction and post to channel

      const { message, emoji, count } = reaction;

      const sendMessage = () => {
        return (
          emoji.name === response.emoji && count === response.reactionCount
        );
      };

      if (sendMessage()) {
        const channel = client.channels.cache.get(response.channelId);
        const formattedMessage = `Shared by @${message?.author?.username}\n${message.content}`;
        if (channel as TextChannel) {
          (channel as TextChannel).send(formattedMessage);
          console.log("Message sent.");
          console.log(formattedMessage);
        } else {
          console.log("Issue with curation channel");
        }
      }
    }
  } catch (error) {
    console.error("Something went wrong when fetching the message:", error);
    return;
  }
});

client.login(DISCORD_TOKEN);

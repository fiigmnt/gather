import { Client, Intents, TextChannel } from "discord.js";
import axios from "axios";

import * as dot from "dotenv";
dot.config();

const { API, DISCORD_TOKEN } = process.env;

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
  rewardAmount: number;
}

client.on("messageReactionAdd", async (ReactionEmoji) => {
  const reaction = ReactionEmoji;
  try {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      await reaction.fetch();
    }

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
        const channel = client.channels.cache.get(
          response.channelId
        ) as TextChannel;
        const formattedMessage = `Shared by @${message?.author?.username}\n${message.content}`;
        if (channel) {
          channel.send(formattedMessage);
          console.log("Message sent.");
          console.log(formattedMessage);
        } else {
          console.log("Issue with curation channel");
        }

        if (response.rewardAmount > 0 && reaction.message.author?.username) {
          // send reward to user
          const { username } = reaction.message.author;
          const { rewardAmount } = response;
          const rewardMessage = `!coin send @${username} ${rewardAmount}`;
          const rewardDescription = `Rewarding @${username} ${rewardAmount} for their curated post in #${channel.name}`;
          reaction.message.channel.send(rewardDescription);
          reaction.message.channel.send(rewardMessage);
        }
      }
    }
  } catch (error) {
    console.error("Something went wrong when fetching the message:", error);
    return;
  }
});

client.login(DISCORD_TOKEN);

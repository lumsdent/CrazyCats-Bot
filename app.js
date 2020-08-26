import { Client, Collection } from "discord.js";

import config from "./config/config.js";
import { createProfile } from "./user/UserService.js";

const client = new Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.content === "+start") {
    go(message);
  }
});

async function go(message) {
  const result = await createProfile({
    discordId: message.author.id,
    name: message.author.username,
    level: 1,
    xp: 0,
  });
  let [user] = result.ops;
  let { name, level, xp } = user;

  message.channel.send(
    `Profile created! You are ${name}.  Begin your adventure at Level ${level}, ${xp}XP`
  );
}
client.login(config.token);

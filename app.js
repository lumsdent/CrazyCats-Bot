import { Client } from "discord.js";

import config from "./config/config.js";
import { createProfile, getProfile, updateXP } from "./user/UserService.js";
import User from "./User.js";
const client = new Client();

client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.content === "+start") {
    go(message);
  } else if (message.content === "+profile") {
    next(message);
  } else if (message.content === "+gain") {
    gain(message);
  }
});

async function go(message) {
  const result = await createProfile(new User(message));
  if (result.newUser) {
    const { newUser } = result;
    message.channel.send(
      `Profile created! You are ${newUser.name}.  Begin your adventure at Level ${newUser.level}, ${newUser.xp}XP`
    );
  } else {
    message.channel.send(`Profile already exists`);
  }
}

async function next(message) {
  const { name, level, xp } = await getProfile(message.author.id);
  message.channel.send(`Profile: Name: ${name}, Level: ${level}, ${xp}XP`);
}

async function gain(message) {
  const { randomBeast, gainedXp } = await updateXP(message.author.id);
  message.channel.send(`You gained ${gainedXp} XP by killing a ${randomBeast}`);
}

client.login(config.token);

import { Client, Collection } from "discord.js";
import fs from "fs";
import * as cmd from "./commands/index.js";
import config from "./config/config.js";

const client = new Client();
client.commands = new Collection();

//get all js files in commands dir excluding index.js
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"))
  .filter((file) => file !== "index.js");

//iterate through files and set object to client.command map. Command name is key obj is value
for (const file of commandFiles) {
  const fileName = file.split(".")[0];
  client.commands.set(cmd[fileName].name, cmd[fileName]);
}

//list of available commands
console.log(client.commands);

//Not required.
client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  //bot responses that dont require command. TODO Refactor
  if (
    message.content.includes("We have to check you are actually playing") &&
    message.author.bot
  ) {
    fuckThePolice(message);
  } else if (message.content.includes("leveled up") && message.author.bot)
    celebrate(message);

  //breakdown message into command(first word) and args[](remaining words in message)
  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  //stop logic if command doesnt exist
  if (!client.commands.has(command)) return;

  try {
    //all command files must have main method
    client.commands.get(command).main(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }

  //uncomment to find custom emoji ids(see celebrate method below)
  // console.log(message.content);
});

function celebrate(message) {
  //**PsychotiꓘKittens** **leveled up**! +1 <:epicrpgsword:697935997555572858> AT, +1 <:epicrpgshield:697935933047177297> DEF, +5 :heart: LIFE
  message.channel.send(":boom:");
}

function fuckThePolice(message) {
  message.channel.send(
    ":man_running: You'll never catch me alive... :police_car: :police_car: :police_car: "
  );
}

client.login(config.token);

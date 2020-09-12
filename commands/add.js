import { MessageEmbed, Message } from "discord.js";
import mongodb from "mongodb";
import util from "../util.js";

const { MongoClient } = mongodb;
export default {
  name: "add",
  description: "create LoL comp",
  main: async function (commandMessage, args) {
    const { channel, author, guild, member } = commandMessage;

    const comp = {
      Top: args[0],
      Jungle: args[1],
      Mid: args[2],
      Bot: args[3],
      Support: args[4],
    };

    const client = util.getMDBClient();
    try {
      await client.connect();
      await client.db("cc_sandbox").collection("league_compositions").updateOne(
        comp,
        {
          $set: comp,
        },
        { upsert: true }
      );
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
    channel.send(
      `Composition Added: 
    Top: ${args[0]} 
    Jungle: ${args[1]}
    Mid: ${args[2]}
    Bot: ${args[3]}
    Support: ${args[4]}
    `
    );
  },
};

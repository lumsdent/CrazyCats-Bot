import { MessageEmbed, Message } from "discord.js";
import mongodb from "mongodb";
import util from "../util.js";

const { MongoClient } = mongodb;
export default {
  name: "search",
  description: "search LoL comp",
  main: async function (commandMessage, args) {
    const { channel, author, guild, member } = commandMessage;
    let data = [];
    for (let searchParam of args) {
      data.push('"' + searchParam + '"');
    }

    const searchParams = data.join(" ");
    console.log(searchParams);

    const client = util.getMDBClient();
    try {
      await client.connect();
      const result = await client
        .db("cc_sandbox")
        .collection("league_compositions")
        .find({ $text: { $search: searchParams } })
        .toArray();
      for (const comp of result) {
        channel.send(JSON.stringify(comp));
      }
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  },
};

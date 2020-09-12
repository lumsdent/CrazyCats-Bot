import { MessageEmbed, Message } from "discord.js";
import mongodb from "mongodb";
import util from "../util.js";

const { MongoClient } = mongodb;
export default {
  name: "delete",
  description: "delete LoL comp",
  main: async function (commandMessage, args) {
    const { channel, author, guild, member } = commandMessage;
    const client = util.getMDBClient();
    const argFirst = args[0];

    //if first arg is all, delete every instance of champion
    //if first arg is lane, delete comp with champ in lane
    //else delete all comps with listed champs

    let deletionFunctions = {
      top: function () {},
    };

    try {
      await client.connect();
      switch (argFirst) {
        case "Top":
        case "Jungle":
        case "Mid":
        case "Bot":
        case "Support":
          console.log(argFirst + `"${args[1]}"`);
          const { deletedCount } = await client
            .db("cc_sandbox")
            .collection("league_compositions")
            .deleteMany({ [argFirst]: args[1] });
          channel.send(`Deleted ${deletedCount} Team comp(s)`);
          break;
        case "all":
          args.shift();

          let data = [];
          for (const searchParam of args) {
            data.push('"' + searchParam + '"');
          }

          const searchParams = data.join(" ");
          console.log(searchParams);

          const { deletedCount: allDelete } = await client
            .db("cc_sandbox")
            .collection("league_compositions")
            .deleteMany({ $text: { $search: searchParams } });
          channel.send(`Deleted ${allDelete} Team comp(s)`);
          break;
        default:
          const comp = {
            Top: args[0],
            Jungle: args[1],
            Mid: args[2],
            Bot: args[3],
            Support: args[4],
          };
          const { deletedCount: defaultDeleteCount } = await client
            .db("cc_sandbox")
            .collection("league_compositions")
            .deleteOne(comp);
          channel.send(`Deleted ${defaultDeleteCount} Team comp(s)`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }
  },
};

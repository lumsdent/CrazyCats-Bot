import { MessageEmbed, Message } from "discord.js";
import mongodb from "mongodb";
import util from "../util.js";
import champions from "lol-champions";

const { MongoClient } = mongodb;
export default {
  name: "add",
  description: "create LoL comp",
  main: async function (commandMessage, args) {
    const { channel, author, guild, member } = commandMessage;

    console.log({ args });

    const selectedChamps = args.map((c) =>
      champions.find((champion) => champion.id === c)
    );

    const comp = {
      Top: selectedChamps[0].name,
      Jungle: selectedChamps[1].name,
      Mid: selectedChamps[2].name,
      Bot: selectedChamps[3].name,
      Support: selectedChamps[4].name,
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

    channel.send(embed(selectedChamps));
    // channel.send(
    //   `Composition Added:
    // Top: ${selectedChamps[0].name}, ${selectedChamps[0].title} ${selectedChamps[0].icon}
    // Jungle: ${selectedChamps[1].name}, ${selectedChamps[1].title} ${selectedChamps[1].icon}
    // Mid: ${selectedChamps[2].name}, ${selectedChamps[2].title} ${selectedChamps[2].icon}
    // Bot: ${selectedChamps[3].name}, ${selectedChamps[3].title} ${selectedChamps[3].icon}
    // Support: ${selectedChamps[4].name}, ${selectedChamps[4].title} ${selectedChamps[4].icon}
    // `
    // );
  },
};

function embed(selectedChamps) {
  return new MessageEmbed()
    .setColor("#5F00BA")
    .setTitle("Composition Added Successfully!")
    .setThumbnail(selectedChamps[util.getRandomInt(4)].icon)
    .setImage(selectedChamps[util.getRandomInt(4)].icon)
    .addFields(
      {
        name: "Top",
        value: `${selectedChamps[0].name}, ${selectedChamps[0].title} ${selectedChamps[0].icon}`,
      },
      {
        name: "Jungle",
        value: `${selectedChamps[1].name}, ${selectedChamps[1].title} ${selectedChamps[1].icon}`,
      },
      {
        name: "Mid",
        value: `${selectedChamps[2].name}, ${selectedChamps[2].title} ${selectedChamps[2].icon}`,
      },
      {
        name: "Bot",
        value: `${selectedChamps[3].name}, ${selectedChamps[3].title} ${selectedChamps[3].icon}`,
      },
      {
        name: "Support",
        value: `${selectedChamps[4].name}, ${selectedChamps[4].title} ${selectedChamps[4].icon}`,
      }
    );
}

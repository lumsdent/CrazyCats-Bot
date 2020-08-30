import items from "../items.js";
import { getBackPack } from "../user/UserService.js";
import mongodb from "mongodb";
import config from "../config/config.js";
const { MongoClient } = mongodb;
export default {
  name: "gather",
  description: "collect random items and add to backpack",
  //   cooldown: 5 * 60,
  main: async function (message, args) {
    let { itemCollected, amount } = getItem();
    await upsertBackpack(message.author.id, itemCollected, amount);

    message.channel.send(`You received ${amount} ${itemCollected}`);
  },
};

export async function upsertBackpack(discordId, itemCollected, amount) {
  const currentBP = await getBackPack(discordId);

  let totalAmount = amount;
  if (currentBP) {
    console.log(currentBP[itemCollected]);
    totalAmount = currentBP[itemCollected]
      ? currentBP[itemCollected] + amount
      : amount;
  }
  const client = getMDBClient();
  try {
    await client.connect();
    const result = await client
      .db("cc_sandbox")
      .collection("backpacks")
      .updateOne(
        { discordId: discordId },
        { $set: { [itemCollected]: totalAmount } },
        { upsert: true }
      );
    console.log(result);
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

function getItem() {
  const itemCollected = items[getRandomFromArr(items)];
  const amount = getRandomInt(3);
  return { itemCollected, amount };
}

function getRandomFromArr(arr) {
  return Math.floor(Math.random() * arr.length);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function getMDBClient() {
  return new MongoClient(config.dbConnectionString, {
    useUnifiedTopology: true,
  });
}

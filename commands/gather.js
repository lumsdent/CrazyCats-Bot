import items from "../items.js";
import { getBackPack } from "../user/UserService.js";
import mongodb from "mongodb";
import util from "../util.js";

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
  const client = util.getMDBClient();
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
  const itemCollected = items[util.getRandomFromArr(items)];
  const amount = util.getRandomInt(3);
  return { itemCollected, amount };
}

import mongodb from "mongodb";
const { MongoClient } = mongodb;

import beastiary from "../beastiary.js";
import config from "../config/config.js";

export async function createProfile(user) {
  //if profile exists, exit
  const existingUser = await getProfile(user.discordId);
  if (existingUser) return { existingUser };

  const client = getMDBClient();
  try {
    await client.connect();

    const results = await client
      .db("cc_sandbox")
      .collection("users")
      .insertOne(user);
    console.log(
      `New profile created with the following id: ${results.insertedId}`
    );
    let newUser = results.ops.shift();
    return { newUser };
  } catch (e) {
    console.error("uh oh!");
  } finally {
    await client.close();
  }
}

export async function getProfile(discordId) {
  const client = getMDBClient();
  try {
    await client.connect();

    const result = await client
      .db("cc_sandbox")
      .collection("users")
      .findOne({ discordId: discordId });
    if (result) {
      console.log(
        `Profile found => Name: ${result.name}, Level: ${result.level}, ${result.xp}XP`
      );
    }
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export async function updateXP(discordId) {
  const gainedXp = getRandomInt(10);
  console.log(`${gainedXp} gained`);
  const { xp: currentXp, level: level } = await getProfile(discordId);
  console.log(level);
  const beastArr = beastiary[level];
  console.log(beastArr);
  const randomBeast = beastArr[getRandomFromArr(beastArr)];
  console.log(randomBeast);
  const client = getMDBClient();
  const newXp = { xp: currentXp + gainedXp };
  try {
    await client.connect();
    const result = await client
      .db("cc_sandbox")
      .collection("users")
      .updateOne({ discordId: discordId }, { $set: newXp });
    return { randomBeast, gainedXp };
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

function getRandomFromArr(arr) {
  return Math.floor(Math.random() * arr.length);
}
function getMDBClient() {
  return new MongoClient(config.dbConnectionString, {
    useUnifiedTopology: true,
  });
}

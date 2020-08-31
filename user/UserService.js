


import beastiary from "../beastiary.js";
import util from "../util.js";

export async function createProfile(user) {
  //if profile exists, exit
  const existingUser = await getProfile(user.discordId);
  if (existingUser) return { existingUser };

  const client = util.getMDBClient();
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
  const client = util.getMDBClient();
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

export async function getBackPack(discordId) {
  const client = util.getMDBClient();
  try {
    await client.connect();

    const result = await client
      .db("cc_sandbox")
      .collection("backpacks")
      .findOne({ discordId: discordId });
    if (result) {
      console.log(result);
    }
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export async function fight(discordId) {
  const gainedXp = util.getRandomInt(10);
  console.log(`${gainedXp} gained`);
  const { xp: currentXp, level: level } = await getProfile(discordId);
  const beastArr = beastiary[level];
  const randomBeast = beastArr[util.getRandomFromArr(beastArr)];
  const client = util.getMDBClient();
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

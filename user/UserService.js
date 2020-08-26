import mongodb from "mongodb";
const { MongoClient } = mongodb;

import config from "../config/config.js";

const client = new MongoClient(config.dbConnectionString, {
  useUnifiedTopology: true,
});

export async function createProfile(newProfile) {
  try {
    await client.connect();

    const result = await client
      .db("cc_sandbox")
      .collection("users")
      .insertOne(newProfile);
    console.log(
      `New profile created with the following id: ${result.insertedId}`
    );
    return result;
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

export async function getProfile(discordId) {
  try {
    await client.connect();

    const result = await client
      .db("cc_sandbox")
      .collection("users")
      .findOne({ discordId: discordId });
    console.log(
      `New profile created with the following id: ${result.insertedId} ${result.discordId} ${result.name}`
    );
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

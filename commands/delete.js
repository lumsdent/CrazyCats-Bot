import util from "../util.js";

export default {
  name: "delete",
  description: "delete LoL comp",
  main: async function (message, args) {
    //TODO move array to better location
    const roles = ["Top", "Jungle", "Mid", "Bot", "Support"];

    const isRoleDelete = roles.some((role) => role === args[0]);
    let deletedCount;

    try {
      const client = util.getMDBClient();
      await client.connect();
      if (isRoleDelete) {
        deletedCount = await deleteChampionFromRole(args[0], args);
      } else if (args[0] === "all") {
        deletedCount = await deleteChampion(args);
      } else {
        deletedCount = await deleteFullComp(args);
      }
      message.channel.send(`Deleted ${deletedCount} Team comp(s)`);
    } catch (e) {
      console.error(e);
    } finally {
      await client.close();
    }

    async function deleteChampionFromRole(argFirst, args) {
      const { deletedCount } = await client
        .db("cc_sandbox")
        .collection("league_compositions")
        .deleteMany({ [argFirst]: args[1] });
      return deletedCount;
    }

    async function deleteChampion(args) {
      args.shift();
      let data = [];
      for (const searchParam of args) {
        data.push('"' + searchParam + '"');
      }
      const searchParams = data.join(" ");
      const { deletedCount } = await client
        .db("cc_sandbox")
        .collection("league_compositions")
        .deleteMany({ $text: { $search: searchParams } });
      return deletedCount;
    }

    async function deleteFullComp(args) {
      const comp = {
        Top: args[0],
        Jungle: args[1],
        Mid: args[2],
        Bot: args[3],
        Support: args[4],
      };
      const { deletedCount } = await client
        .db("cc_sandbox")
        .collection("league_compositions")
        .deleteOne(comp);
      return deletedCount;
    }
  },
};

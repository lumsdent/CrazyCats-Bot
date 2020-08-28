import { fight } from "../User/UserService.js";

export default {
  name: "fight",
  main: async function (message) {
    const { randomBeast, gainedXp } = await fight(message.author.id);
    message.channel.send(
      `You gained ${gainedXp} XP by killing a ${randomBeast}`
    );
  },
};

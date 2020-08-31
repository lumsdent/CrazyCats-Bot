import { fight } from "../User/UserService.js";

export default {
  name: "fight",
  description:
    "I guess you can fight stuff and gain exp. Prob gonna change later",
  cooldown: 60,
  main: async function (message) {
    const { randomBeast, gainedXp } = await fight(message.author.id);
    message.channel.send(
      `You gained ${gainedXp} XP by killing a ${randomBeast}`
    );
  },
};

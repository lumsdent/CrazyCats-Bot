import { getProfile } from "../User/UserService.js";
export default {
  name: "profile",
  main: async function profile(message) {
    const { name, level, xp } = await getProfile(message.author.id);
    message.channel.send(`Profile: Name: ${name}, Level: ${level}, ${xp}XP`);
  },
};

import { createProfile } from "../User/UserService.js";
import User from "../User.js";

export default {
  name: "start",
  main: async function main(message) {
    const result = await createProfile(new User(message));
    const { newUser } = result;
    if (newUser) {
      message.channel.send(
        `Profile created! You are ${newUser.name}.  Begin your adventure at Level ${newUser.level}, ${newUser.xp}XP`
      );
    } else {
      message.channel.send(`Profile already exists`);
    }
  },
};

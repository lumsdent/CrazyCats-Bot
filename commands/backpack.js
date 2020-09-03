import { getBackPack } from "../user/UserService.js";
import { MessageEmbed } from "discord.js";

export default {
  name: "backpack",
  description: "collect random items and add to backpack",
  alias: "bp",
  main: async function (message, args) {
    const backpack = await getBackPack(message.author.id);
    console.log(message.author.displayAvatarURL);

    let data = [];
    for (let key of Object.keys(backpack)) {
      if (key != "_id" && key != "discordId") {
        data.push({ name: `${key}`, value: `${backpack[key]}`, inline: true });
      }
    }
    console.log(data);
    message.channel.send(embed(message, data));
  },
};

function embed(message, data) {
  return (
    new MessageEmbed()
      .setColor("#5F00BA")
      .setTitle(`${message.author.username}'s Backpack`)
      .setThumbnail(message.author.avatarURL)
      .addFields(data)
      .setTimestamp()
      .setFooter("created by psychotikkittens")
  );
}

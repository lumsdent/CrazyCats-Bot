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
    // data.push(`${message.author.username}'s Backpack`);
    for (let key of Object.keys(backpack)) {
      if (key != "_id" && key != "discordId") {
        data.push({ name: `${key}`, value: `${backpack[key]}`, inline: true });
      }
    }
    console.log(data);
    message.channel.send(embed(message, data));
  },
};

// { name: 'Regular field title', value: 'Some value here' },
// 		{ name: '\u200B', value: '\u200B' },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },
// 		{ name: 'Inline field title', value: 'Some value here', inline: true },

function embed(message, data) {
  return (
    new MessageEmbed()
      .setColor("#5F00BA")
      .setTitle(`${message.author.username}'s Backpack`)
      .setThumbnail(message.author.avatarURL)
      .addFields(data)
      // .addField('Inline field title', 'Some value here', true)
      // .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter("created by psychotikkittens")
  );
}

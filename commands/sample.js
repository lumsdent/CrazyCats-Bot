import { MessageEmbed } from "discord.js";

export default {
  name: "sample",
  main: function (message) {
    const messageEmbed = new MessageEmbed()
      .setColor("#5F00BA")
      .setTitle("Check Me out on Git Hub")
      .setURL("https://github.com/lumsdent/CrazyCats-Bot/blob/master/README.md")
      .setAuthor(message.author.username)
      .setDescription("Look at this pretty little embed")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/748257463815635044/748650222518927421/20200721_141225.jpg"
      )
      // .addFields(
      // 	{ name: 'Regular field title', value: 'Some value here' },
      // 	{ name: '\u200B', value: '\u200B' },
      // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
      // 	{ name: 'Inline field title', value: 'Some value here', inline: true },
      // )
      // .addField('Inline field title', 'Some value here', true)
      // .setImage('https://i.imgur.com/wSTFkRM.png')
      .setTimestamp()
      .setFooter("created by psychotikkittens");

    message.channel.send(messageEmbed);
  },
};

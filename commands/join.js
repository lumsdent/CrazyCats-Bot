import { MessageEmbed, Message } from "discord.js";
const cats = [
  "Jaguars",
  "Lions",
  "Tigers",
  "House Cats",
  "Leopards",
  "Jaguarundis",
];

export default {
  name: "join",
  description:
    "Starts your campaign.  Let's you choose a team and assigns you to that role.",
  cooldown: 0.5 * 60,
  main: async function (commandMessage, args) {
    const { channel, author, guild, member } = commandMessage;
    let guildRoles = guild.roles.cache;
    let memberRoles = member.roles.cache;

    let memberRoleNames = [];

    //get user's current roles
    for (const role of memberRoles) {
      memberRoleNames.push(role[1].name);
    }

    //Ensure they are not on a team already
    if (
      memberRoleNames.some((role) =>
        cats.some((cat) => cat.toLowerCase() === role.toLowerCase())
      )
    ) {
      return channel.send("You are already on a team");
    }

    //Send list of possible teams/roles
    channel.send(embed(author)).then(() => {
      const filter = (responseMessage) =>
        author.id === responseMessage.author.id &&
        cats.some(
          (cat) => responseMessage.content.toLowerCase() === cat.toLowerCase()
        );
      //wait for response that matches one of team names
      channel
        .awaitMessages(filter, { time: 60000, max: 1, errors: ["time"] })
        .then((msg) => {
          msg.first().react("👋");
          const selectedRole = guildRoles.find(
            (role) =>
              role.name.toLowerCase() === msg.first().content.toLowerCase()
          );
          //Welcome and assign user to team/role
          member.roles.add(selectedRole);
          channel.send(
            `Hello! Welcome ${author.username} to the ${selectedRole}.`
          );
        })
        .catch((error) => {
          console.log(error);
          channel.send("You did not enter a proper value!");
        });
    });
  },
};

function embed(author) {
  return new MessageEmbed()
    .setColor("#5F00BA")
    .setAuthor(`${author.username}'s Journey Begins`, author.avatarURL())
    .setThumbnail(author.avatarURL())
    .setTitle(`Please select a Team: `)
    .setDescription(cats.join(`\n`));
}

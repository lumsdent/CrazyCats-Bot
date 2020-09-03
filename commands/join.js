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

    for (const role of memberRoles) {
      memberRoleNames.push(role[1].name);
    }

    if (
      memberRoleNames.some((role) =>
        cats.some((cat) => cat.toLowerCase() === role.toLowerCase())
      )
    ) {
      return channel.send("You are already on a team");
    }

    channel.send(embed(author)).then(() => {
      const filter = (responseMessage) =>
        author.id === responseMessage.author.id &&
        cats.some((cat) =>
          responseMessage.content.toLowerCase().includes(cat.toLowerCase())
        );

      channel
        .awaitMessages(filter, { time: 60000, max: 1, errors: ["time"] })
        .then((collectedMessages) => {
          channel
            .send(
              `Hello! Welcome ${author.username} to the ${
                collectedMessages.first().content
              }.`
            )
            .then((msg) => {
              msg.react("👋");
              const selectedRole = guildRoles.find(
                (role) => role.name === collectedMessages.first().content
              );
              member.roles.add(selectedRole);
            });
        })
        .catch((error) => {
          console.log(error);
          channel.send("You did not enter any input!");
        });
    });
  },
};

function embed(author) {
  return new MessageEmbed()
    .setColor("#5F00BA")
    .setAuthor(`${author.username}'s Journey Begins`, author.avatarURL())
    .setTitle(`Please select a Team: `)
    .setDescription(cats.join(`\n`));
}

// '748594294830399580' => Role {
//     guild: Guild {
//       members: [GuildMemberManager],
//       channels: [GuildChannelManager],
//       roles: [RoleManager],
//       presences: [PresenceManager],
//       voiceStates: [VoiceStateManager],
//       deleted: false,
//       available: true,
//       id: '702233254186713118',
//       shardID: 0,
//       name: 'Crazy Cats',
//       icon: 'fdead310728134e70ad8577539bc6663',
//       splash: null,
//       discoverySplash: null,
//       region: 'us-east',
//       memberCount: 12,
//       large: false,
//       features: [],
//       applicationID: null,
//       afkTimeout: 300,
//       afkChannelID: null,
//       systemChannelID: '702233254186713121',
//       embedEnabled: undefined,
//       premiumTier: 0,
//       premiumSubscriptionCount: 0,
//       verificationLevel: 'NONE',
//       explicitContentFilter: 'DISABLED',
//       mfaLevel: 0,
//       joinedTimestamp: 1598126462275,
//       defaultMessageNotifications: 'MENTIONS',
//       systemChannelFlags: [SystemChannelFlags],
//       vanityURLCode: null,
//       vanityURLUses: null,
//       description: null,
//       banner: null,
//       rulesChannelID: null,
//       publicUpdatesChannelID: null,
//       preferredLocale: 'en-US',
//       ownerID: '312754952575516672',
//       emojis: [GuildEmojiManager]
//     },
//     id: '748594294830399580',
//     name: 'Crazy Cats',
//     color: 10181046,
//     hoist: true,
//     rawPosition: 9,
//     permissions: Permissions { bitfield: 104320577 },
//     managed: false,
//     mentionable: true,
//     deleted: false
//   },

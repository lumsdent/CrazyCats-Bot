import config from "../config/config.js";
export default {
  name: "help",
  aliases: ["commands"],
  usage: "[command name]",
  main: async function (message, args) {
    const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push("Here's a list of all my commands:\n");
      data.push(
        commands
          .map((command) => `\`${config.prefix}${command.name}\``)
          .join(", ")
      );
      data.push(
        `\nYou can send \`${config.prefix}help [command name]\` to get info on a specific command!`
      );

      return message.channel.send(data, { split: true }).catch((error) => {
        console.error("Uh oh");
      });
    }

    const name = args[0].toLowerCase();
    const command =
      commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return message.reply("that's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases)
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    if (command.description)
      data.push(`**Description:** ${command.description}`);
    if (command.usage)
      data.push(`**Usage:** ${config.prefix}${command.name} ${command.usage}`);

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

    message.channel.send(data, { split: true });
  },
};

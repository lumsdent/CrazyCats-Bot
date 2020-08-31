export default {
  name: "hello",
  description:
    "Asks for name. Waits for response. Returns Hello <name> and reacts to your message with a wave",
  cooldown: 0.5 * 60,
  main: function (message, args) {
    message.channel.send("Hi. What is your name?").then(() => {
      const filter = (m) => message.author.id === m.author.id;

      message.channel
        .awaitMessages(filter, { time: 60000, max: 1, errors: ["time"] })
        .then((messages) => {
          messages.first().react("👋");
          message.channel.send(`Hello! ${messages.first().content}.`);
        })
        .catch(() => {
          message.channel.send("You did not enter any input!");
        });
    });
  },
};

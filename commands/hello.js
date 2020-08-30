export default {
  name: "hello",
  description: "Test method to verify application works. Returns Hello World",
  cooldown: 1 * 60,
  main: function (message, args) {
    message.channel.send("Hello World");
  },
};

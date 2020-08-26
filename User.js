export default class User {
  //new User
  constructor(discordMessage) {
    this.discordId = discordMessage.author.id;
    this.name = discordMessage.author.username;
    this.level = 1;
    this.xp = 0;
    this.gold = 0;
    //inventory
    //equipment
    //class
    //race
    //items
    //stats
    //title
    //other stuff...
  }
}

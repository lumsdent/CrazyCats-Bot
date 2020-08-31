export default class User {
  //new User
  constructor(discordMessage) {
    this.discordId = discordMessage.author.id;
    this.name = discordMessage.author.username;
    this.level = 1;
    this.xp = 0;
    this.gold = 0;
    this.backpack = {};
    this.health = 100;
    //equipment
    //class
    //race
    //items
    //stats
    //title
    //other stuff...
  }
}

//TODO Find home for this and refactor where required
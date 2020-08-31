import mongodb from "mongodb";
const { MongoClient } = mongodb;
import config from "./config/config.js";

export default {
  getRandomFromArr: function (arr) {
    return Math.floor(Math.random() * arr.length);
  },

  getRandomInt: function (max) {
    return Math.floor(Math.random() * Math.floor(max) + 1);
  },

  getMDBClient: function () {
    return new MongoClient(config.dbConnectionString, {
      useUnifiedTopology: true,
    });
  },
};

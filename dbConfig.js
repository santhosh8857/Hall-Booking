const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const dbURL =
  "mongodb+srv://Santhosh:Snowbell%4030@cluster0.uqg9j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

module.exports = { mongodb, MongoClient, dbURL };

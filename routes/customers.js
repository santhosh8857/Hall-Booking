var express = require("express");
var router = express.Router(); // Responsible for routes
const { mongoDB, MongoClient, dbURL } = require("../dbConfig");

// responsible for routes
var router = express.Router();

// Get customers
// req - request from the client / res - response to the server
router.get("/", async (req, res) => {
  // connecting to mongoDb using url
  const client = await MongoClient.connect(dbURL);

  try {
    // connecting to DB
    const db = client.db("hallBooking");

    // connecting to collection and extracting data
    let data = await db.collection("customers").find().toArray();

    res.send({
      message: "Success",
      data: data,
    });
  } catch (err) {
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

module.exports = router;

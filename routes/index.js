var express = require("express");
const { ObjectId } = require("mongodb"); // to use ObjectID from mongodb
const { mongodb, MongoClient, dbUrl, dbURL } = require("../dbConfig");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const client = await MongoClient.connect(dbURL);

  try {
    const db = client.db("hallBooking");

    let rooms = await db.collection("rooms").find().toArray();
    let customers = await db.collection("customers").find().toArray();

    res.send({
      message: "Success",
      data: { rooms: rooms, customers: customers },
    });
  } catch (err) {
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

module.exports = router;

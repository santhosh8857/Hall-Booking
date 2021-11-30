var express = require("express");
var router = express.Router(); // Responsible for routes
const { mongodb, MongoClient, dbUrl, dbURL } = require("../dbConfig"); // importing from dBConfig file

// Get rooms // req - request / res - response
router.get("/", async (req, res) => {
  // connecting to mongoDB using URL
  const client = await MongoClient.connect(dbURL);

  try {
    // connecting to DB
    const db = client.db("hallBooking");

    // conecting to the collection and extracting all the data
    let data = await db.collection("rooms").find().toArray();

    // sending response
    res.send({
      message: "Success",
      data: data,
    });
  } catch (err) {
    console.log(err);

    // response from the server in case of any errors
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

// Post method -> to create a room in the hotel
router.post("/create-room", async (req, res) => {
  const client = await MongoClient.connect(dbURL);

  try {
    const db = client.db("hallBooking");
    let data = await db.collection("rooms").insertOne(req.body);

    res.send({
      message: "Room Created!",
      data: data,
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

module.exports = router;

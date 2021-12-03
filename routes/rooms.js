var express = require("express");
const { ObjectId } = require("mongodb"); // to use ObjectID from mongodb
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

// To get the booked room details
router.get("/booked-rooms", async (req, res) => {
  const client = await MongoClient.connect(dbURL);

  try {
    const db = client.db("hallBooking");

    // find({condition}, {fieldWeNeed : 1})
    // select roomName, status, customerName, date, startTime, endTime from rooms
    let data = await db
      .collection("rooms")
      .find(
        { status: "Occupied" },
        {
          roomName: 1,
          status: 1,
          customerName: 1,
          date: 1,
          startTime: 1,
          endTime: 1,
        }
      )
      .toArray();

    res.send({ message: "Success", bookedRooms: data });
  } catch (err) {
    console.log(err);
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

// put method -> to book a room in the hotel
router.put("/book-room/:id", async (req, res) => {
  const client = await MongoClient.connect(dbURL);

  //  to store the Occupied date and time
  let OStartTime,
    OEndTime = null;

  try {
    const db = client.db("hallBooking");

    // fetching the required room details

    let roomDetails = await db
      .collection("rooms")
      .findOne({ _id: ObjectId(req.params.id) });

    // verify the date is empty
    if (roomDetails.date !== null) {
      // Occupied timings
      OStartTime = Date.parse(
        `${roomDetails.date} ${roomDetails.startTime}:00 GMT+0530`
      );

      OEndTime = Date.parse(
        `${roomDetails.date} ${roomDetails.endTime}:00 GMT+0530`
      );
    }

    // Booking timings
    let BStartTime = Date.parse(
      `${req.body.date} ${req.body.startTime}:00 GMT+0530`
    );
    let BEndTime = Date.parse(
      `${req.body.date} ${req.body.endTime}:00 GMT+0530`
    );

    //  if the dates are empty that means the book is vacant
    if (roomDetails.date === null) {
      // inserting the customer collection with customer details
      let customerDetails = await db.collection("customers").insertOne({
        customerName: req.body.customerName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        roomName: roomDetails.roomName,
      });

      // updating the room collection with the current room details
      let roomData = await db.collection("rooms").updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            customerName: req.body.customerName,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            status: "Occupied",
          },
        }
      );

      // sending response
      res.send({ message: "Room Booked!!!", data: customerDetails });
    }
    // if the room is not empty then verfiy the already booked start and end timings
    else if (
      (BStartTime <= OStartTime && BEndTime <= OStartTime) ||
      (BStartTime >= OEndTime && BEndTime >= OEndTime)
    ) {
      let customerDetails = await db.collection("customers").insertOne({
        customerName: req.body.customerName,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        roomName: roomDetails.roomName,
      });

      let roomData = await db.collection("rooms").updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            customerName: req.body.customerName,
            date: req.body.date,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            status: "Occupied",
          },
        }
      );

      res.send({ message: "Room Booked!!!", data: customerDetails });
    } else {
      res.send({ message: "Room Occupied" });
    }
  } catch (err) {
    res.send({ message: "Error in connection" });
  } finally {
    client.close();
  }
});

module.exports = router;

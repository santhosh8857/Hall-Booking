var express = require("express");

// responsible for routes
var router = express.Router();

// Get customers
// req - request from the client / res - response to the server
router.get("/", (req, res) => {
  res.send("Customer API");
});

module.exports = router;

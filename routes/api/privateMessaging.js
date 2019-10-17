const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Import Messaging model

const Messaging = require("../../models/PrivateMessaging");

router.get("/test", (req, res) => {
  res.json({ msg: "Messaging is working" });
});

module.exports = router;

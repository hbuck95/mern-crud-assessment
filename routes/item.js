const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Item = require("../models/item");
const User = require("../models/user");

const validateItem = require("../validator/item");

router.get("/test", (req, res) => res.json({"message": "This is a test message"}));

module.exports = router;
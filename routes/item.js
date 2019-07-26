const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Item = require("../models/item");
const User = require("../models/user");

const validateItem = require("../validator/item");

router.get("/test", (req, res) => res.json({"message": "This is a test message"}));

router.get("/getAll", (req, res) => {
    Item.find({}, '-email')
	.then(items => {
		if (items === undefined || items.length == 0) {
			errors.noItems = "There are no items!";
			res.status(404).json({Error:"There are no items."}).end();
		} else {
            res.status(200).json(items).end();
        }
	})
	.catch(err => res.status(404).json({Error:"There are no items."}).end());
});


module.exports = router;
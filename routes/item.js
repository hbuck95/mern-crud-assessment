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

router.post("/add", (req, res) => {
	let validation = validateItem(req.body);	

	if(!validation.isValid)
        return res.status(400).json(validation.errors).end();        
        
    User.findOne({username: req.body.username}).then(user => {        
        bcrypt.compare(req.body.password, user.password).then(ifMatch => {
            if(ifMatch){
                Item(req.body).save().then(() =>
                    res.status(200).json({Message:"Item added to DB."}).end())
                    .catch(err => console.log(err));                 
            } else {
                res.status(400).json({Error:"The username or password entered does not match a username or password in our records."});
            }			
        });        
    }).catch(() => {
        res.status(400).json({Error:"The username or password entered does not match a username or password in our records."});
    });    

});


module.exports = router;
const express = require("express");
const router = express.Router();
const validateUser = require("../validator/user");

const User = require("../models/user");
const encrypt = require("../encryption/encrypt");

router.get("/test", (req, res) => res.json({"message": "This is a test message"}));

router.post("/register", (req, res) => {

	let validation = validateUser(req.body);	

	if(!validation.isValid)
        return res.status(400).json(validation.errors);
        
	encrypt(req.body.password).then(hash => {
		req.body.password = hash;

		User(req.body).save().then(() =>
            res.status(200).json({message:"User details added to DB."}))
                .catch(err => console.log(err));
                		
    }).catch(err => (console.log(err)));
    
});


module.exports = router;
const express = require("express");
const router = express.Router();
const validateUser = require("../validator/user");

const User = require("../models/user");

router.get("/test", (req, res) => res.json({"message": "This is a test message"}));

router.post("/register", (req, res) => {

	let validation = validateUser(req.body);	

	if(!validation.isValid)
        return res.status(400).json(validation.errors);
        
    console.log(req.body);

    res.status(200).json({message:"User details added to DB."});

	// encrypt(req.body.email).then(hash => {
	// 	//console.log("Hash is: "+hash);
	// 	req.body.email = hash;

	// 	Item(req.body).save().then(() =>
    //     	res.end("Item added to DB."))
	// 		.catch(err => console.log(err));
			
	// }).catch(err => (console.log(err)));
});


module.exports = router;
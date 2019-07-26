const express = require("express");
const router = express.Router();
const validateUser = require("../validator/user");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const encrypt = require("../encryption/encrypt");

router.get("/test", (req, res) => res.json({"message": "This is a test message"}));

router.post("/register", (req, res) => {

    let validation = validateUser(req.body);
    //let v = 0;
    
	if(!validation.isValid)
        return res.status(400).json(validation.errors).end();

    User.find({username: req.body.username}).then(user => {

        if(user.length){
            return res.json({error:"A user with the supplied username already exists."}).end();
        } else {

            User.find({email: req.body.email}).then(user => {
                if(user.length){
                    return res.json({error:"A user with the supplied email address already exists."}).end();
                } else {

                    encrypt(req.body.password).then(hash => {
                        req.body.password = hash;                
                        User(req.body).save().then(() =>
                            res.status(200).json({message:"User details added to DB."}))
                                .catch(err => console.log(err));                                        
                    }).catch(err => (console.log(err)));                
                }

            }).catch(err => console.log(err));
        }

    }).catch(err => console.log(err));        
});

router.post("/login", (req, res) => {
    User.findOne({username: req.body.username}).then(user => {        
        bcrypt.compare(req.body.password, user.password).then(ifMatch => {
			if(ifMatch){
				res.status(200).json({Message: "You have successfully logged in."});
			} else {
				res.status(400).json({Error:"The username or password entered does not match a username or password in our records."});
			}			
		});        
    }).catch(() => {
        res.status(400).json({Error:"The username or password entered does not match a username or password in our records."});
    });
});

module.exports = router;
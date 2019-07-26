const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Item = require("../models/item");
const User = require("../models/user");

const validateItem = require("../validator/item");


// @route   GET item/test
// @desc    Send a test message to the client
// @access  Public
router.get("/test", (req, res) => res.json({"message": "This is a test message"}));

// @route   GET item/getAll
// @desc    Get all items
// @access  Public
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


// @route   POST item/add
// @desc    Add a new item to the database
// @access  Public
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


// @route   DELETE item/delete
// @desc    Delete an item from the database
// @access  Public
router.delete("/delete", (req,res) => {

    Item.findById(req.body._id).then(item => { 

        User.findOne({username: item.username}).then(user => { 

            if(user.email === req.body.email){

                bcrypt.compare(req.body.password, user.password).then(ifMatch => {
                    if(ifMatch){
                        item.remove().then(() =>
                            res.status(200).json({Message:"Item removed from DB."}).end())
                            .catch(() => res.status(404).json({ Error: "No item found" }));                           
                    } else {
                        res.status(400).json({Error:"The username, email, or password entered does not match a set in our records."}).end();
                    }			
                });  

            } else {
                res.status(400).json({Error:"The username, email, or password entered does not match a set in our records."}).end();
            }    

        }).catch(() => {
            res.status(400).json({Error:"The username, email, or password entered does not match a set in our records."}).end();
        });      

    }).catch(() => {
        res.status(400).json({Error:"Couldn't find an item with the provided ID."}).end();
    }); 
  	
});

// @route   PUT item/delete
// @desc    Update an item in the database
// @access  Public
router.put("/update", (req,res) => {

    Item.findById(req.body._id).then(item => { 

        User.findOne({username: item.username}).then(user => { 

            if(user.email === req.body.email){

                bcrypt.compare(req.body.password, user.password).then(ifMatch => {

                    if(ifMatch){
                        item.update({
                            content: req.body.content
                        },{
                            useFindAndModify:false
                        }).then(() =>{
                            res.status(200).json({Message: "Item successfully updated."}).end();
                        }).catch((err) =>{
                            res.status(400).json({Error: err.message}).end();
                        });
                    } else {
                        res.status(400).json({Error:"The username, email, or password entered does not match a set in our records."}).end();
                    }	

                });  

            } else {
                res.status(400).json({Error:"The username, email, or password entered does not match a set in our records."}).end();
            }    

        }).catch(() => {
            res.status(400).json({Error:"The username, email, or password entered does not match a set in our records."}).end();
        });      

    }).catch(() => {
        res.status(404).json({Error:"An item with the supplied ID could not be found."}).end();
    }); 

});


module.exports = router;
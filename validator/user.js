const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateItem(user) {
    let errors = {};

    user.username = !isEmpty(user.username) ? user.username : "";

    if(Validator.isEmpty(user.username)){
        errors.username = "A username is required.";
    }

    if(Validator.isEmpty(user.email)){
        errors.username = "A email address is required.";
    }

    if(!Validator.isAlphanumeric(user.username, "en-GB")){
        errors.username = "Usernames can only contain letters or numbers.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};
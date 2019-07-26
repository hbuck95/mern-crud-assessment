const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateItem(user) {
    let errors = {};

    user.username = !isEmpty(user.username) ? user.username : "";
    user.password = !isEmpty(user.password) ? user.password : "";
    user.repeatPassword = !isEmpty(user.repeatPassword) ? user.repeatPassword : "";
    user.email = !isEmpty(user.email) ? user.email : "";

    if(Validator.isEmpty(user.username)){
        errors.username = "A username is required.";
    }

    if(Validator.isEmpty(user.email)){
        errors.email = "A email address is requiyred.";
    }

    if(Validator.isEmpty(user.password)){
        errors.password = "A password is required.";
    }

    if(!Validator.equals(user.password, user.repeatPassword)){
        errors.password = "Your entered passwords do not match.";
    }

    if(!Validator.isAlphanumeric(user.username, "en-GB")){
        errors.username = "Usernames can only contain letters or numbers.";
    }

    if(!Validator.isEmail(user.email)){
        errors.email = "A valid email address must be supplied.";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};
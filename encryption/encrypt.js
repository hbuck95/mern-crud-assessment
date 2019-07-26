const bcrypt = require("bcryptjs");

module.exports = async function encrypt(data){
    //Generates the salt asynchronously as the hash is computed
    const hashedData = await new Promise((res,rej) => {
        bcrypt.hash(data, 12, function(err,hash){
            if(err) rej(err);
            res(hash);  
        });
    })
    return hashedData;
}
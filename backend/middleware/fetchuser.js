var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

const JWT_SECRET = "helloworld";


const fetchuser = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    let token = req.header("auth-token");
    if (!token) {
        res.status(498).send({ error: "doesnt exist" })
    }
    try {
       
        token=req.header('auth-token')
        // console.log(token);
        const data=await jwt.verify(token,JWT_SECRET);
        // console.log(data.id);
        req.id = data.id;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchuser;
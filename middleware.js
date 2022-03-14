const jwt = require("jsonwebtoken");
const User = require("./models/UserSchema");

const authenticate =  async (req, res, next) => {
    console.log("in auth middleware");
    try {
        
        const token = req.header('Authorization').replace('Bearer ','');
        const verifyToken = jwt.verify(token, process.env.KEY);
        const foundUser = await User.findById({ _id: verifyToken._id, "tokens.token": token });
        if (!foundUser) {
            throw new Error("User not found");
        }
        req.token = token;
        req.foundUser = foundUser;
        req.userId = foundUser._id;
        next();

    } catch (err) {
        console.log(err);
        res.status(401).send("Unauthorised access");
    }
}

module.exports = authenticate;
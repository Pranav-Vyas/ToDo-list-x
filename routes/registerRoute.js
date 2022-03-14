const express = require("express");
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) =>{
    const {username, password} = req.body;
    if (username && password) {
        const foundUser = await User.findOne( {username:username} );
        if (foundUser) {
            return res.status(400).json({error: "Username already exists"});
        } else {
            const data = {
                username: req.body.username
            }
            data.password = await bcrypt.hash(password, 10);
            User.create(data)
            .then(async (user) => {
                const token = await user.generateAuthToken();
                
                return res.status(200).json({user: user, token: token});
            })
        }
    } else {
        return res.status(400).json({error: "Please make sure each field has valid value."});
    }
})



module.exports = router;
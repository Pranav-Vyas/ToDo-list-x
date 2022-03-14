const express = require("express");
const User = require("../models/UserSchema");
const middleware = require("../middleware");

const router = express.Router();

router.get('/:id', middleware, async (req, res) => {
    var userId = req.params.id;
    console.log("in get todo route");
    try {
        const foundUser = await User.findById(userId);
        
        return res.status(200).json({list: foundUser.list});
        
    } catch (error) {
        return res.status(400).json({list: []});
    }

})

router.post('/add', middleware, async (req, res) => {
    try {
        console.log("in todo add route");
        console.log(req.body);
        const {userid, data} = req.body;
        const foundUser = await User.findById( userid );
        foundUser.list = foundUser.list.concat({item: data});
        await foundUser.save();
        return res.status(200).json({user: foundUser});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
})

router.delete('/delete', middleware, async (req, res) => {
    try {
        const {userId, dataId} = req.body;
        const foundUser = await User.findById(userId);
        foundUser.list.pull({ _id: dataId })
        await foundUser.save();
        return res.status(200).json({user: foundUser});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error});
    }
})

module.exports = router;
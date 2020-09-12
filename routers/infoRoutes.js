const express = require("express");
const infoRouter = express.Router();
const auth = require("../middleware/auth");
const users = require("../database/models/users");
const rooms = require("../database/models/rooms");
const roomChats = require("../database/models/roomChats");

///////////////////////////ALL USERS PAGE//////////////////////////////////

//to obtain the list of all registered users
infoRouter.get("/allUsers", auth, async (req, res) => {
    try {
        const allUsers = await users.find({}, "username");
        res.send(allUsers);
    } catch (err) {
        console.log(err);
        return;
    }
});
//////////////////////////////////////////////////////////////////////

///////////////////////////HOME PAGE//////////////////////////////////

//sample to check if auth works
infoRouter.get("/home", auth, (req, res) => {
    const { username } = req.infoRouter.locals.user;
    res.send({ html: `WELCOME TO CHITTER-CHATTER ${username}` });
});
//////////////////////////////////////////////////////////////////////

//to generate a unique roomId for users who want to communicate,
//this id will remain same for any of their future communications,
//this helps to retrieve the previous chats
infoRouter.post("/room", auth, async (req, res) => {
    const { us1, us2 } = req.body;
    const r1 = us1 + us2,
        r2 = us2 + us1;
    try {
        var room = await rooms.findOne({ $or: [{ room: r1 }, { room: r2 }] });
        if (!room) {
            console.log("no room");
            room = new rooms({ room: r1, us1, us2 });
            await room.save();
            const entry = new roomChats({ room: r1, chats: [] });
            await entry.save();
        }
        res.send({ roomId: room.room });
    } catch (e) {
        console.log(e);
        return;
    }
});

//for retrieving previous chats of the specified room
infoRouter.get("/chats/:room", auth, async (req, res) => {
    try {
        const roomChat = await roomChats.findOne({ room: req.params.room });
        res.send(roomChat);
    } catch (e) {
        console.log(e);
        return;
    }
});

module.exports = infoRouter;

//room model, stores a unique roomId for every distict pair of users
const mongoose = require("mongoose");
const rooms = mongoose.model("rooms", {
    us1: String,
    us2: String,
    room: String,
});

module.exports = rooms;

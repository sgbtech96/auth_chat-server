//roomChats model, stores chat messages in an array, corresponding to a unique roomId
const mongoose = require("mongoose");
const roomChats = mongoose.model("roomChats", {
    room: String,
    chats: [],
});

module.exports = roomChats;

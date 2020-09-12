//users model, will record each registered user, and keeps track of their login sessions
const mongoose = require("mongoose");
const users = mongoose.model("users", {
    username: String,
    password: String,
    email: String,
    tokens: [],
});

module.exports = users;

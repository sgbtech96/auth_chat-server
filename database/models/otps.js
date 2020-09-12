//otp model, used while email verfication of a user
const mongoose = require("mongoose");
const otps = mongoose.model("otps", {
    email: String,
    otp: String,
    isVerified: Boolean,
});

module.exports = otps;

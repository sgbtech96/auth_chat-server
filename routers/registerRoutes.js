const express = require("express");
const registerRouter = express.Router();
const allowedToRegister = require("../middleware/allowedToRegister");
const otps = require("../database/models/otps");
const users = require("../database/models/users");
const bcrypt = require("bcrypt");
const registerValidator = require("../validators/registerValidator");

////////////////////////////REGISTER ROUTE////////////////////////////
registerRouter.post("/register", allowedToRegister, async (req, res) => {
    var value = null;
    try {
        value = await registerValidator.validateAsync(req.body);
    } catch (err) {
        res.send({ error: err.details[0].message });
        return;
    }
    try {
        var { username, password, email } = value;
        const isRegistered = await users.findOne({ username });
        if (isRegistered) {
            res.send({ error: "this username is unavailable!" });
            return;
        }
    } catch (e) {
        console.log(e);
    }
    bcrypt.hash(password, 8, async (err, hash) => {
        password = hash;
        try {
            const user = new users({ username, password, email });
            await user.save();
            await otps.findOneAndDelete({ email });
            res.send({ msg: "registered successfully!" });
        } catch (e) {
            console.log(e);
            return;
        }
    });
});
//////////////////////////////////////////////////////////////////////

module.exports = registerRouter;

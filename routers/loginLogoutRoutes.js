const express = require("express");
const loginLogoutRouter = express.Router();
const loginValidator = require("../validators/loginValidator");
const users = require("../database/models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const auth = require("../middleware/auth");

///////////////////////////LOGIN ROUTE///////////////////////////////
const msg = "Either UserName or Password is incorrect!";
const oneYear = 60 * 60 * 24 * 30 * 12;
loginLogoutRouter.post("/login", async (req, res) => {
    var value = res.body;
    try {
        value = await loginValidator.validateAsync(req.body);
    } catch (err) {
        console.log(err);
        res.send({ error: err.details[0].message });
        return;
    }
    try {
        const { username, password } = value;
        const user = await users.findOne({ username });
        if (!user) {
            res.send({ error: msg });
            return;
        }
        const orgHash = user.password;
        const isMatch = await bcrypt.compare(password, orgHash);
        if (!isMatch) {
            res.send({ error: msg });
            return;
        }
        if (user.tokens.length >= 2) {
            res.send({
                error:
                    "you have exceeded session limit, logout of atleast 1 device!",
            });
            return;
        }
        const token = jwt.sign({ userId: username }, SECRET_KEY, {
            expiresIn: oneYear,
        });
        await users.findOneAndUpdate(
            { username },
            {
                $push: {
                    tokens: { token },
                },
            }
        );
        res.send({ msg: "successfully logged in!", token, username });
    } catch (e) {
        console.log(e);
        return;
    }
});
//////////////////////////////////////////////////////////////////////

///////////////////////////LOGOUT ROUTE///////////////////////////////
loginLogoutRouter.get("/logout", auth, async (req, res) => {
    const { username, token } = req.app.locals.user;
    try {
        await users.findOneAndUpdate(
            { username },
            {
                $pull: {
                    tokens: { token },
                },
            }
        );
        res.send({ msg: "logged Out!" });
    } catch (e) {
        console.log(e);
        return;
    }
});
/////////////////////////////////////////////////////////////////////

module.exports = loginLogoutRouter;

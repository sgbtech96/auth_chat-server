const otps = require("../database/models/otps");
const msg = "first verify your email!";
// to check if the user who is trying to register has verified his/her email or not
const allowedToRegister = async (req, res, next) => {
    const email = req.body.email;
    try {
        const user = await otps.findOne({ email });
        if (!user) {
            res.send({ error: msg });
            return;
        }
        if (!user.isVerified) {
            res.send({ error: msg });
            return;
        }
        next();
    } catch (e) {
        console.log(e);
    }
};

module.exports = allowedToRegister;

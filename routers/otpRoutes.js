const express = require("express");
const otpRouter = express.Router();
const emailValidator = require("../validators/emailValidator");
const { ADMIN_EMAIL } = process.env;
const otps = require("../database/models/otps");
const users = require("../database/models/users");
const transporter = require("../services/sendEmailOtp");

//////////////////////////EMAIL VERIFICATION via OTP//////////////////

otpRouter.post("/sendOtp", async (req, res) => {
    var value = null;
    try {
        value = await emailValidator.validateAsync(req.body);
    } catch (err) {
        console.log(err);
        res.send({ error: err.details[0].message });
        return;
    }
    const email = value.email;

    // try {
    //     const userExists = await users.findOne({ email });
    //     if (userExists) {
    //         res.send({ error: "this email is unavailable!" });
    //         return;
    //     }
    // } catch (e) {
    //     console.log(e);
    //     return;
    // }

    var minm = 10000;
    var maxm = 99999;
    var otp = Math.floor(Math.random() * (maxm - minm + 1)) + minm;
    var mailOptions = {
        from: ADMIN_EMAIL,
        to: email,
        subject: "Chitter-Chatter Account Verification",
        text: "Your OTP is " + otp,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            console.log(error);
            res.send({ error: "otp wasn't sent!" });
            return;
        }
        try {
            await otps.findOneAndUpdate(
                { email },
                {
                    $set: {
                        otp,
                        isVerified: false,
                    },
                },
                { upsert: true }
            );
            res.send({ msg: `otp sent to email ${email}` });
        } catch (e) {
            console.log(e);
            return;
        }
    });
});

otpRouter.post("/verifyOtp", async (req, res) => {
    const { email, otp } = req.body;
    const msg = "invalid otp!";
    try {
        const orgOtp = await otps.findOne({ email });
        if (!orgOtp) {
            res.send({ error: msg });
            return;
        }
        if (orgOtp.otp != otp) {
            res.send({ error: msg });
            return;
        }
        await otps.findOneAndUpdate(
            { email },
            {
                $set: {
                    isVerified: true,
                },
            }
        );
        res.send({ msg: `otp verified against ${email}` });
    } catch (e) {
        console.log(e);
        return;
    }
});

//////////////////////////////////////////////////////////////////////

module.exports = otpRouter;

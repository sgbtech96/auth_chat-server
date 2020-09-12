var nodemailer = require("nodemailer");
const { ADMIN_EMAIL, ADMIN_EMAIL_PASS } = process.env;

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
    },
});

module.exports = transporter;

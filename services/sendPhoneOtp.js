var twilio = require("twilio");
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NO } = process.env;
var client = new twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
module.exports = client;

//sample usage
// client.messages
//     .create({
//         body: `Your OTP is ${}`,
//         to: `+91${}`, // Text this number
//         from: TWILIO_NO, // From a valid Twilio number
//     })
//     .then(async (message) => {});

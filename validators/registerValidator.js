const Joi = require("@hapi/joi");
const registerValidator = Joi.object({
    username: Joi.string().min(4).max(12).required(),
    password: Joi.string()
        .pattern(new RegExp("[A-Za-z0-9]{4,}"))
        .min(4)
        .max(12)
        .required(),
    confirmPassword: Joi.ref("password"),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
}).with("password", "confirmPassword");

module.exports = registerValidator;

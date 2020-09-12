const Joi = require("@hapi/joi");
const emailValidator = Joi.object({
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
});

module.exports = emailValidator;

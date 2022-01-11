const e = require("express");
const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "any.required": "please input a valid email",
    }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).messages({
    "string.pattern.base": "please enter valid password",
  }),
  rememberme: Joi.custom((value, helper) => {
    if (value === "on") {
      return true;
    } else {
      return helper.message("error from custom validation");
    }
  }),
});

module.exports.schema = schema;

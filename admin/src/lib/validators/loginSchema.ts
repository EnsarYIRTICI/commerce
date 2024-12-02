import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } }) // TLD kontrolü kapatıldı
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string()
    .min(6)
    // .pattern(new RegExp("[0-9]"))
    // .pattern(new RegExp("[A-Z]"))
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain at least one number and one uppercase letter",
    }),
});

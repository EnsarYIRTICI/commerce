import Joi from "joi";

export const variantSchema = Joi.object({
  image: Joi.array().items(Joi.any()).label("Images"),
  name: Joi.string().required().label("Name"),
  sku: Joi.string().required().label("SKU"),
  stock: Joi.number().integer().min(0).required().label("Stock"),
  price: Joi.number().positive().required().label("Price"),
});

import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  description: Joi.string().allow("").label("Description"),
  category: Joi.string().required().label("Category"),
  subcategory: Joi.string().allow("").label("Sub Category"),
});

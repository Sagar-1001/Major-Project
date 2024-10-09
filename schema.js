const Joi = require("joi");
const review = require("./models/review");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().trim().min(1).required(),
        description: Joi.string().trim().min(1).required(),
        location: Joi.string().trim().min(1).required(),
        country: Joi.string().trim().min(1).required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null).optional(),
    }).required()
});

module.exports.reviewSchmea = Joi.object({
    review: Joi.object({
         rating : Joi.number().required().min(1).max(5),
         comment : Joi.string().required(),
    }).required()
})
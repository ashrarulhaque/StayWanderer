const Joi = require('joi');

module.exports.listingSchema = Joi.object ({
    listing: Joi.object ({
        title: Joi.string()
            .max(100)
            .min(5)
            .required(),
        description: Joi.string()
            .max(1000)
            .min(10)
            .required(),
        image: Joi.object({
            filename: Joi.string,
            url: Joi.string().allow("", null),
            }),
        price: Joi.number()
            .min(1)
            .required(),
        location: Joi.string()
            .max(75)
            .min(2)
            .required(),
        country: Joi.string()
            .max(75)
            .min(2)
            .required(),
    }).required(),
});

module.exports.reviewSchema = Joi.object ({
    review: Joi.object ({
        rating: Joi.number()
            .required()
            .min(1)
            .max(5),
        comment: Joi.string()
            .required()
            .min(5)
            .max(750),
        
    }).required(),
});
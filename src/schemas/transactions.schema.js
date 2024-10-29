import joi from 'joi';

export const transactionSchema = joi.object({
    value: joi.number().precision(2).positive().required(),
    description: joi.string().required(),
    type: joi.string().valid("income", "expense").required()
});
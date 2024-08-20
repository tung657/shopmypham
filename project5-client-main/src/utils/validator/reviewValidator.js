import Joi from 'joi';

export const reviewValidator = (data) => {
  const rule = Joi.object({
    ...data,
    rating: Joi.number().min(1).required(),
    classify: Joi.string().required(),
    comment: Joi.string().required(),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
    'number.min': 'Vui lòng đánh giá',
  });

  return rule.validate(data, { abortEarly: false });
};

import Joi from 'joi';

export const contactValidator = (data) => {
  const rule = Joi.object({
    ...data,
    fullName: Joi.string().required(),
    email: Joi.string()
      .regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i)
      .required()
      .messages({
        'string.pattern.base': 'Không đúng định dạng email.',
      }),
    subject: Joi.string().required(),
    message: Joi.string().required(),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
  });

  return rule.validate(data, { abortEarly: false });
};

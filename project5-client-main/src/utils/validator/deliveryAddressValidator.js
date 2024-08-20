import Joi from 'joi';

export const deliveryAddressValidator = (data) => {
  const rule = Joi.object({
    ...data,
    full_name: Joi.string().required(),
    phone: Joi.string()
      .regex(/^[0-9]{10,11}$/i)
      .required()
      .messages({
        'string.pattern.base': 'Không đúng định dạng.',
      }),
    province: Joi.object().required().min(1),
    district: Joi.object().required(),
    commune: Joi.object().required(),
    address_detail: Joi.string().required(),
    isAddressDefault: Joi.boolean().required(),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
  });

  return rule.validate(data, { abortEarly: false });
};

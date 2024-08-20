import Joi from 'joi';

export const registerValidator = (data) => {
  const rule = Joi.object({
    ...data,
    username: Joi.string()
      .regex(/^(?:[A-Z\d][A-Z\d_-]{5,9})$/i)
      .required()
      .messages({
        'string.pattern.base':
          'Tài khoản phải có độ dài 6-10 và không có ký tự đặc biệt.',
      }),
    email: Joi.string()
      .regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i)
      .required()
      .messages({
        'string.pattern.base': 'Không đúng định dạng email.',
      }),
    password: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,11}$/i)
      .required()
      .messages({
        'string.pattern.base':
          'Mật khẩu phải có độ dài 6-12, gồm cả ký tự, số và ký tự đặc biệt.',
      }),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
  });

  return rule.validate(data, { abortEarly: false });
};

export const resetPasswordValidator = (data) => {
  const rule = Joi.object({
    ...data,
    email: Joi.string()
      .regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i)
      .required()
      .messages({
        'string.pattern.base': 'Không đúng định dạng email.',
      }),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
  });

  return rule.validate(data, { abortEarly: false });
};

export const customerValidator = (data) => {
  const rule = Joi.object({
    ...data,
    avatar: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string()
      .regex(/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i)
      .required()
      .messages({
        'string.pattern.base': 'Không đúng định dạng email.',
      }),
    phone: Joi.string()
      .regex(/^[0-9]{10,11}$/i)
      .required()
      .messages({
        'string.pattern.base': 'Không đúng định dạng.',
      }),
    gender: Joi.number().required(),
    carts: Joi.array().optional().empty(Joi.array().length(0)),
    delivery_addresses: Joi.array().optional().empty(Joi.array().length(0)),
    orders: Joi.array().optional().empty(Joi.array().length(0)),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
  });

  return rule.validate(data, { abortEarly: false });
};

export const changePasswordValidator = (data) => {
  const rule = Joi.object({
    ...data,
    oldPassword: Joi.string().required(),
    newPassword: Joi.string()
      .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/i)
      .required()
      .messages({
        'string.pattern.base':
          'Mật khẩu phải có độ dài 6-12, gồm cả ký tự, số và ký tự đặc biệt.',
      }),
    newPasswordConfirmation: Joi.string().required(),
  }).messages({
    'string.empty': 'Không thể để trống',
    'any.required': 'Không thể để trống',
  });

  return rule.validate(data, { abortEarly: false });
};

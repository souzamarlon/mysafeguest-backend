import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      mobile: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      password: Yup.string().min(6),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors,
    });
  }
};

import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      street: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      number: Yup.number().required(),
      postal_code: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors,
    });
  }
};

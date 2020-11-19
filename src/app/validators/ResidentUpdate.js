import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      mobile: Yup.string(),
      owner_id: Yup.number(),
      street: Yup.string(),
      number: Yup.number(),
      city: Yup.string(),
      state: Yup.string(),
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

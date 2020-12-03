import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      resident_id: Yup.number().required(),
      start_date: Yup.date().required(),
      end_date: Yup.date().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({
      error: err.errors,
    });
  }
};

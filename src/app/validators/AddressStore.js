import * as Yup from 'yup';
import User from '../models/User';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      owner_id: Yup.number().required(),
      street: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      number: Yup.number().required(),
      postal_code: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    const userToDelete = await User.findByPk(req.body.owner_id);

    await userToDelete.destroy();

    return res.status(400).json({
      error: err.errors,
    });
  }
};

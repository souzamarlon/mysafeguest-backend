import User from '../models/User';

class UserController {
  async index(req, res) {
    const owner = await User.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(owner);
  }

  async store(req, res) {
    const emailsExists = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailsExists) {
      return res.status(400).json({ error: 'This email already exists!' });
    }

    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();

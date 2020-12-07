import User from '../models/User';

class UserController {
  async index(req, res) {
    const owner = await User.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(owner);
  }

  async store(req, res) {
    const { name, email } = await User.create(req.body);

    // TODO Check the email already exists.

    return res.json({ name, email });
  }
}

export default new UserController();

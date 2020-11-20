import User from '../models/User';

class UserController {
  async index(req, res) {
    const owner = await User.findAll({
      attributes: ['id', 'name'],
    });

    return res.json(owner);
  }
}

export default new UserController();

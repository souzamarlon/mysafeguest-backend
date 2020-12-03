import jwt from 'jsonwebtoken';
import Resident from '../models/Resident';
import authConfig from '../../config/auth';

class ResidentSessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await Resident.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
        isAdmin: false,
      },
      token: jwt.sign({ id, isAdmin: false }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new ResidentSessionController();

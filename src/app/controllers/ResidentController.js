import * as Yup from 'yup';

import Resident from '../models/Resident';

class ResidentController {
  async store(req, res) {
    const {
      id,
      name,
      email,
      mobile,
      owner_id,
      street,
      number,
      city,
      state,
      password_hash,
    } = await Resident.create(req.body);

    return res.json({
      id,
      name,
      email,
      mobile,
      owner_id,
      street,
      number,
      city,
      state,
      password_hash,
    });
  }
}

export default new ResidentController();

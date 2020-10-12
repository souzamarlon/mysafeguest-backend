import * as Yup from 'yup';

import Resident from '../models/Resident';

class ResidentController {
  async index(req, res) {
    const { id } = req.params;

    const allResidents = await Resident.findAll({
      where: {
        owner_id: id,
      },
    });

    return res.json(allResidents);
  }

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

  async update(req, res) {
    const { id } = req.params;

    const resident = await Resident.findByPk(id);

    const residentUpdated = await resident.update(req.body);

    return res.json(residentUpdated);
  }

  async delete(req, res) {
    const { id } = req.params;

    const resident = await Resident.findByPk(id);

    const residentDeleted = await resident.destroy();

    return res.json(residentDeleted);
  }
}

export default new ResidentController();

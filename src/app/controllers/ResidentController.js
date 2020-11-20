// import * as Yup from 'yup';

import Resident from '../models/Resident';

class ResidentController {
  async index(req, res) {
    const { id } = req.params;

    const allResidents = await Resident.findAll({
      order: [['id', 'DESC']],
      where: {
        owner_id: id,
      },
      attributes: [
        'id',
        'name',
        'email',
        'mobile',
        'street',
        'number',
        'city',
        'state',
        'postal_code',
      ],
    });

    return res.json(allResidents);
  }

  async store(req, res) {
    const emailExists = await Resident.findOne({
      where: { email: req.body.email },
    });

    const mobileExists = await Resident.findOne({
      where: { mobile: req.body.mobile },
    });

    if (emailExists) {
      return res.status(400).json({ error: 'Email already exists!' });
    }

    if (mobileExists) {
      return res.status(400).json({ error: 'Mobile already exists!' });
    }

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
      postal_code,
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
      postal_code,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const resident = await Resident.findByPk(id);

    if (resident.email !== req.body.email) {
      const emailExists = await Resident.findOne({
        where: { email: req.body.email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'Email already exists!' });
      }
    }

    if (resident.mobile !== req.body.mobile) {
      const mobileExists = await Resident.findOne({
        where: { mobile: req.body.mobile },
      });

      if (mobileExists) {
        return res.status(400).json({ error: 'Mobile already exists!' });
      }
    }

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

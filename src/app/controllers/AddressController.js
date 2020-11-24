import Address from '../models/Address';

class AddressController {
  async index(req, res) {
    const { id } = req.params;

    const getAddresses = await Address.findAll({
      order: [['id', 'DESC']],
      where: {
        owner_id: id,
      },
      attributes: ['id', 'street', 'number', 'city', 'state', 'postal_code'],
    });

    return res.json(getAddresses);
  }

  async store(req, res) {
    const streetExists = await Address.findOne({
      where: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
      },
    });

    if (streetExists) {
      return res.status(400).json({ error: 'This address already exists!' });
    }

    const {
      id,
      owner_id,
      street,
      number,
      city,
      state,
      postal_code,
    } = await Address.create(req.body);

    return res.json({
      id,
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

    const streetExists = await Address.findOne({
      where: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        postal_code: req.body.postal_code,
      },
    });

    if (streetExists) {
      return res.status(400).json({ error: 'This address already exists!' });
    }

    const getAddress = await Address.findByPk(id);

    const {
      owner_id,
      street,
      number,
      city,
      state,
      postal_code,
    } = await getAddress.update(req.body);

    return res.json({
      owner_id,
      street,
      number,
      city,
      state,
      postal_code,
    });
  }
}

export default new AddressController();

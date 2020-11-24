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
}

export default new AddressController();

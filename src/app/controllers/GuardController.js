import Appointment from '../models/Appointment';
import Resident from '../models/Resident';

class GuardController {
  async index(req, res) {
    const { id } = req.params;

    const appointments = await Appointment.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Resident,
          attributes: ['name', 'mobile', 'street', 'number', 'city', 'state'],
        },
      ],
    });

    return res.json(appointments);
  }
}

export default new GuardController();

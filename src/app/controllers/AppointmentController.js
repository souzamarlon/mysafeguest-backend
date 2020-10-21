import Appointment from '../models/Appointment';
import Resident from '../models/Resident';

class AppointmentController {
  async index(req, res) {
    const { id } = req.params;

    const appointments = await Appointment.findAll({
      order: [['id', 'DESC']],
      where: {
        resident_id: id,
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

  async store(req, res) {
    const appointmentCreated = await Appointment.create(req.body);

    return res.json(appointmentCreated);
  }

  async update(req, res) {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    const appointmentUpdate = await appointment.update(req.body);

    return res.json(appointmentUpdate);
  }

  async delete(req, res) {
    const { id } = req.params;

    const appointment = await Appointment.findByPk(id);

    const appointmentDelete = await appointment.destroy();

    return res.json(appointmentDelete);
  }
}

export default new AppointmentController();

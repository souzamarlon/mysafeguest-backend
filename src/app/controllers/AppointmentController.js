import { isBefore, isToday, isPast, parseISO } from 'date-fns';

import Appointment from '../models/Appointment';
import Resident from '../models/Resident';
import Address from '../models/Address';

class AppointmentController {
  async index(req, res) {
    const { id } = req.params;

    const appointments = await Appointment.findAll({
      order: [['end_date', 'DESC']],
      where: {
        resident_id: id,
      },
      include: [
        {
          model: Resident,
          attributes: ['id', 'name', 'email', 'mobile', 'address_id', 'number'],
          include: [
            {
              model: Address,
              attributes: [
                'id',
                'street',
                'number',
                'postal_code',
                'city',
                'state',
              ],
            },
          ],
        },
      ],
    });

    return res.json(appointments);
  }

  async store(req, res) {
    const actualDate = new Date();

    if (
      isPast(parseISO(req.body.start_date), actualDate) &&
      !isToday(parseISO(req.body.start_date))
    ) {
      return res.status(403).json({
        error: 'This date has passed!',
      });
    }

    if (
      isBefore(parseISO(req.body.end_date), parseISO(req.body.start_date)) &&
      !isToday(parseISO(req.body.end_date))
    ) {
      return res.status(403).json({
        error: 'The end date is before the start date!',
      });
    }

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

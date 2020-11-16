import { isBefore, isAfter } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Appointment from '../models/Appointment';
import Resident from '../models/Resident';

class GuardController {
  async index(req, res) {
    const { id } = req.params;

    const actualDate = new Date();

    // const brazilTMZ = 'America/Sao_Paulo';
    const mexicoTMZ = 'America/Mexico_City';

    // const dateTimeUTCBrazil = utcToZonedTime(actualDate, brazilTMZ);
    const dateTimeUTCMexico = utcToZonedTime(actualDate, mexicoTMZ);

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

    if (!appointments) {
      return res.status(404).json({
        error: 'There is no schedule.',
      });
    }

    if (isBefore(dateTimeUTCMexico, appointments.start_date)) {
      return res.status(403).json({
        error: 'The current date is earlier than the scheduled date.',
      });
    }

    if (isAfter(dateTimeUTCMexico, appointments.end_date)) {
      return res.status(403).json({
        error: 'The scheduled date is before the current date.',
      });
    }

    return res.json(appointments);
  }
}

export default new GuardController();

import { isBefore, isToday, isPast } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Appointment from '../models/Appointment';
import Resident from '../models/Resident';
import Address from '../models/Address';

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

    if (!appointments) {
      return res.status(404).json({
        error: 'There is no schedule.',
      });
    }

    if (
      isBefore(dateTimeUTCMexico, appointments.start_date) &&
      !isToday(appointments.start_date)
    ) {
      return res.status(403).json({
        error: 'The current date is earlier than the appointment.',
      });
    }

    if (isPast(appointments.end_date) && !isToday(appointments.end_date)) {
      return res.status(403).json({
        error: 'This appointment has passed!',
      });
    }

    return res.json(appointments);
  }
}

export default new GuardController();

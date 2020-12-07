const stripe = require('stripe')(
  'sk_test_51HvC0VJe1Ww2Z11RHWIz5isnxZyWyW03GSG4PuQrGZmHc0cjS3ArY2oUJplO103NI4gqN339kNJ0TVDs02m8YYbG00ggOp9qyl'
);

class PaymentController {
  async store(req, res) {
    const { name, number, exp_month, exp_year, cvc } = req.body;

    // number: '4242424242424242',
    // exp_month: 12,
    // exp_year: 2021,
    // cvc: '314',

    try {
      const token = await stripe.tokens.create({
        card: {
          name,
          number,
          exp_month,
          exp_year,
          cvc,
        },
      });

      if (token) {
        const charge = await stripe.charges.create({
          amount: 2000,
          currency: 'usd',
          source: token.id,
          description: 'My First Test Charge (created for API docs)',
        });

        return res.json(charge);
      }
    } catch (err) {
      return res.json(err.message);
    }
  }
}

export default new PaymentController();

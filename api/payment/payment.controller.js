const Payment = require('./payment.model');
// const {getUserById} = require('../user/user.service')
const {
  makePayment,
  createCardToken,
  createCustomer,
} = require('./payment.service');
const User = require('../user/user.model');

// const { updateUserHandler } = require('../user/user.controller')
// const { updateUser } = require('../user/user.service')

async function makePaymentHandlers(req, res) {
// console.log('entra en pay')
  try {
    const { user, body: payment } = req;
console.log('user', user, 'body', payment)
    let userData = user
      if(!user?.billing?.creditCards?.[0]?.tokenId){
        const createToken = await createCardToken(payment, user)
        console.log('token car', createToken)
        const customer = await createCustomer(createToken)
        console.log('customer', customer)
        userData = customer
      }

      const { data, success } = await makePayment(userData, payment);
      console.log('data', data)

      if (!success) {
      return res.status(400).json(data);
    }

    const today =  new Date();
    const paymentNew = await Payment.create({
      refId: data.recibo,
      description: payment.description,
      value: payment.value,
      tax: payment?.tax,
      taxBase: payment?.taxBase,
      currency: payment.currency,
      paymentDate: today.getDate()
    });

    await User.updateOne({ _id: user._id }, {
      paymentId: [...user.paymentId,   paymentNew._id]
    });

    return res.status(200).json({ success, data });
  } catch (error) {
    console.log('err in handler')
    res.status(500).send({
      message: 'Error realizando el pago',
      error,
    });
  }
}
// async function getPaymentByIdHandler(req, res) {
//   const { id } = req.params;
//   try {
//     const course = await getPaymentById(id);
//     if (!course) {
//       return res
//         .status(404)
//         .json({ message: `product not found with id: ${id}` });
//     }

//     return res.status(200).json(course);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
// async function makePaymentEveryMonthHandlers(req,res){

// }

module.exports = {
  makePaymentHandlers,
};

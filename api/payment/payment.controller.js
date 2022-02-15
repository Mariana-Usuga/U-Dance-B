const Payment = require('./payment.model');
// const {
//   makePayment,
//   createCardToken,
//   createCustomer
// } = require('./payment.service');
const User = require('../user/user.model');

// const { updateUserHandler } = require('../user/user.controller')
// const { updateUser } = require('../user/user.service')

async function makePaymentHandlers(req, res) {

  // try {

    const { user, body: payment } = req;
    console.log('user', user, )
    // let userData = user
    //   if(!user?.billing?.creditCards?.[0]?.tokenId){
    //     const createToken = await createCardToken(payment, user)
    //     const customer = await createCustomer(createToken)
    //     userData = customer
    //   }

    //   const { data, success } = await makePayment(userData, payment);

    //   if (!success) {
    //   return res.status(400).json(data);
    // }
    // const paymentNew = await Payment.create({
    //   // userId: user._id,
    //   refId: data.recibo,
    //   description: payment.description,
    //   value: payment.value,
    //   tax: payment?.tax,
    //   taxBase: payment?.taxBase,
    //   currency: payment.currency
    // });
    const today =  new Date();
    // console.log(today.getDay())
    // console.log(today.getDay())
    const paymentNew = {
        // userId: user._id,
        refId: '8768777777777',
        description: 'esta es la description',
        value: '160000',
        paymentDate: today.getDate()
    }
    const newPayment = new Payment(paymentNew);
    const savedMarket = await newPayment.save();

    console.log('payment', savedMarket)
    // console.log('day', savedMarket.createdAt.getDay())
    const newUser = {...user,  paymentId: [...user.paymentId, savedMarket._id] }
const mari = {
  name:"mari",
  edad: "21",
  friends:['sara']
}
const newMari = {...mari, friends: [...mari.friends, 'erika']}
console.log('mari', newMari)
    const updatedUser = await User.findByIdAndUpdate(user._id, newUser, {
      new: true,
    });
    console.log('updated', updatedUser)
  }
  //   return res.status(200).json({ success, data });
  // } catch (error) {
    // res.status(500).send({
      // message: 'Error realizando el pago',
      // error,
    // });
  // }
// }

module.exports = {
  makePaymentHandlers,
};

const epayco = require('epayco-sdk-node')({
  apiKey: process.env.EPAYCO_PUBLIC_KEY,
  privateKey: process.env.EPAYCO_PRIVATE_KEY,
  lang: 'ES',
  test: true,
});
const Payment = require('./payment.model');

const { addBillingCards, addBillingCustomerId, } = require('../user/user.service')

const get = require('lodash/get');
// const { log } = require('../../utils/logger');

async function createCardToken(data, user) {
  const { cardNumber, cardExpYear, cardExpMonth, cardCVC } = data;
  console.log('user in card token', user)
  console.log('data', data)

  const creditInfo = {
    'card[number]': cardNumber,
    'card[exp_year]': cardExpYear,
    'card[exp_month]': cardExpMonth,
    'card[cvc]': cardCVC,
  };
console.log('credi info', creditInfo)
  try {
    const { card, id } = await epayco.token.create(creditInfo);
    console.log('card in token', card, 'id', id)

    const creditCard = {
      expMonth: card.exp_month,
      expYear: card.exp_year,
      name: card.name,
      mask: card.mask,
      tokenId: id,
    };

console.log('credit info', creditCard, 'user', user)
    const updateUser = await addBillingCards(user, creditCard);
console.log('uod in card token', updateUser)

    return updateUser
  } catch (error) {
    console.log('entr en error in token')
    log.error('error', error)
  }
}

async function createCustomer(user) {
  console.log('entra en create Customer')
try{
  const customerInfo = {
    token_card: user?.billing?.creditCards?.[0]?.tokenId,
    name: user.username,
    email: user.email,
    default: true,
  };
console.log('customerInfo in createCustomer', customerInfo)
  const { data } = await epayco.customers.create(customerInfo);

  const cCustomer =  await addBillingCustomerId(user, data.customerId);
  return cCustomer
}catch(err){
  console.log('entra en err customer')
}
}

async function makePayment(user, payment) {
  const defaultTokenId = get(user, 'billing.creditCards[0].tokenId');
  const customerId = get(user, 'billing.customerId');

  const paymentInfo = {
    token_card: get(payment, 'tokenId', defaultTokenId),
    customer_id: get(payment, 'customerId', customerId),
    doc_type: get(payment, 'docType'),
    doc_number: get(payment, 'docNumber'),
    name: get(payment, 'firstName', user.name),
    last_name: get(payment, 'lastName', user.name),
    email: get(payment, 'email', user.email),
    city: get(payment, 'city'),
    address: get(payment, 'address'),
    phone: get(payment, 'phone'),
    cell_phone: get(payment, 'cellPhone'),
    bill: get(payment, 'bill'),
    description: get(payment, 'description'),
    value: get(payment, 'value'),
    tax: get(payment, 'tax'),
    tax_base: get(payment, 'taxBase'),
    currency: get(payment, 'currency'),
    dues: get(payment, 'dues'),
    ip: get(payment, 'ip'),
    use_default_card_customer: true,
  };

  return await epayco.charge.create(paymentInfo);
}

async function getPaymentById(id) {
  try {
    const payment = await Payment.findById(id);
    return payment;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCardToken,
  createCustomer,
  makePayment,
  getPaymentById
};

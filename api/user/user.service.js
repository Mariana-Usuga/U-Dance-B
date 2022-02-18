const get = require('lodash/get');
const User = require('./user.model');
const { sendEmail } = require('../../utils/email')
const cron = require('node-cron');

const { getPaymentById } =require('../payment/payment.service')

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
}

async function createUser(user) {
  try {
    const newUser = new User(user);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, user) {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail(email){
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
}

async function addBillingCards(user, card) {
  const creditCards = get(user, 'billing.creditCards', []);
  const customer = {
    billing: {
      creditCards: creditCards.concat(card),
    },
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });

  return updatedUser;
}

async function addBillingCustomerId(user, customerId) {
  const creditCards = get(user, 'billing.creditCards', []);

  const customer = {
    billing: {
      creditCards,
      customerId,
    },
  };

  const updatedUser = await User.findByIdAndUpdate(user._id, customer, {
    new: true,
  });

  return updatedUser;
}

async function findOneUser(query) {
  const user = await User.findOne(query);
  return user;
}

async function everyDayHandler(res, req){

  const every2Day = async () => {
    const users = await getAllUsers()
    const today = new Date()

  for(const user of users){
    for(const payId of user.paymentId){
      const pay = await getPaymentById(payId)
      const { paymentDate } = pay
      if(paymentDate === today.getDate()){
        const email = {
          to: user.email,
          subject: 'Remember your payment',
          template_id: 'd-b4cc409e05224c35ab445c9e52a9edbf',
          dynamic_template_data: {
            name: user.name,
            url: 'http://localhost:3000/pages/pay'
          }
        }
        sendEmail(email)
      }
    }
  }
  }
cron.schedule('* * * * *', function() { //* * * * * = 1 minute
  every2Day()
})
}

// everyDayHandler()

// async function ValidateUserEmail(email) {
//   try {
//     const isMatch = await User.findOne({ email });
//     if (isMatch) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     throw error;
//   }
// }
// async function ValidateUserName(username) {
//   try {
//     const isMatch = await User.findOne({ username });
//     if (isMatch) {
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {}
// }

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  addBillingCards,
  addBillingCustomerId,
  findOneUser,
  everyDayHandler
  // ValidateUserEmail,
  // ValidateUserName,
};

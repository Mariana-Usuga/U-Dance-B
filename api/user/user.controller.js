const crypto = require('crypto')
const {
  getAllUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
  getUserByEmail
} = require('./user.service');

const { signToken } = require('../../auth/auth.services')
const User = require('./user.model');
// const { sendEmail } = require('../../utils/email')

async function getAllUsersHandler(req, res) {
  try {
    const users = await getAllUsers();

    if (users.length === 0) {
      return res.status(404).json({ message: 'no Courses found' });
    }

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createUserHandler(req, res) {
  const newUser = req.body

  try {
    if (!newUser.email) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }
    const userByEmail = await getUserByEmail(newUser.email);
    if(userByEmail){
      return res.status(409).json({ response: 'User already exists' });
    }
    const user = await createUser(req.body);

    const token = signToken(user.profile)

    return res.status(201).json({ JWT: token });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUserHandler(req, res) {
  const { id } = req.params;
  try {
    const {
      name, lastname, email, password, image, paymentId
    } = req.body;

    if (!name && !lastname && !email && !password && !image && !paymentId) {
      return res.status(422).json({ response: 'Missing values in the body' });
    }

    const user = await updateUser(id, req.body);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteUserHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await deleteUser(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: `user not found with id: ${id}` });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateUserCourseIdHandler(req, res) {
  const { user } = req;
  const { id } = req.params;
  try{
    const updatedUser = await User.findByIdAndUpdate({_id: user._id},
       { $push: { 'courseId':  id  } }, { upsert: true, new: true } )

    return res.json(updatedUser)
  }catch(err){
    console.log('err',err)
  }
}

async function updateUserPaymentIdHandler(req, res) {
  const { user } = req;
  const { id } = req.params;
  try{
    const updatedUser = await User.findByIdAndUpdate({_id: user._id},
       { $push: { 'paymentId':  id  } }, { upsert: true, new: true } )

    return res.json(updatedUser)
  }catch(err){
    console.log('err',err)
  }
}

async function getUserMeHandler(req, res) {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(
      '???? ~ file: user.controller.js ~ line 142 ~ getUserMeHandler ~ error',
      error,
    );
    return res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getAllUsersHandler,
  createUserHandler,
  getUserByIdHandler,
  updateUserHandler,
  deleteUserHandler,
  updateUserCourseIdHandler,
  updateUserPaymentIdHandler,
  getUserMeHandler
};

 // const hash = crypto.createHash('sha256').update(newUser.email).digest('hex');
    // newUser.emailResetToken = hash
    // newUser.emailResetExpires = Date.now() + 3600000 * 24;

    // const user = await createUser(req.body);

    // const email = {
    //   to: user.email,
    //   subject: 'Activate your account',
    //   template_id: 'd-b4cc409e05224c35ab445c9e52a9edbf',
    //   dynamic_template_data:{
    //     name: user.name,
    //     // url:`http://localhost:3000/active${hash}`,
    //     url:'localhost:3000/active/'
    //   }
    // }

    // sendEmail(email)

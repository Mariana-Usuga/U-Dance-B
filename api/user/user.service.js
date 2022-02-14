const User = require('./user.model');

async function getAllUsers() {
  try {
    const user = await User.find();
    return user;
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
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

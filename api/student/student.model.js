const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = new Schema({
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  username: {
    type: String,
  },
  email:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: String,
  courseId: [
    {
      type: Array,
      ref: 'Course',
    },
  ],
});

studentSchema.pre('save', async function (next) {
  const student = this;
  try {
    if (!student.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(student.password, salt);
    student.password = hash;
  } catch (error) {
    next(error);
  }
});

studentSchema.methods.comparePassword = async function (candidatePassword) {
  const student = this;
  try {
    return await bcrypt.compare(candidatePassword, student.password);
  } catch (error) {
    throw error;
  }
};

student.Schema.virtual('profile').get(function () {
  const { email, _id, username } = this;
  return { email, _id, username };
});

module.exports = mongoose.model('', studentSchema);

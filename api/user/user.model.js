const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
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
  role:{
    type:String,
    required: true,
    default:'student'
  },
  emailResetToken:{
    type: String,
  },
  image: String,
  courseId: [
    {
      type: Array,
      ref: 'Course',
    },
  ],
});


// student.Schema.virtual('profile').get(function () {
//   const { email, _id, username } = this;
//   return { email, _id, username };
// });

module.exports = mongoose.model('User', userSchema);

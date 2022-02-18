const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
    uppercase: true
  },
  description: {
    type: String,
    required: true,
    uppercase: true
  },
  teacher: {
    type: String,
    required: true,
    uppercase: true
  },
  image: String,
  price: String,
  place: {
    type:String,
    uppercase: true
  },
  rhythm: String,
  paymentId:
    {
      type: Array,
      ref: 'Payment',
    },
});

module.exports = mongoose.model('Course', CourseSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teacher: {
    type: String,
    required: true,
  },
  image: String,
  price: {
    type: Number,
    required: true,
  },
  place: {
    type:String,
    required: true,
  },
  rhythm: String,
  paymentId:
    {
      type: Array,
      ref: 'Payment',
    },
});

module.exports = mongoose.model('Course', CourseSchema);

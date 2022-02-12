const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
  image: String,
  place: String,
  rhythm: String,
});

module.exports = mongoose.model('Course', CourseSchema);

const mongoose = require('mongoose');

const { Schema } = mongoose;
const CreditCardSchema = new mongoose.Schema(
  {
    expMonth: {
      type: String,
      required: true,
      trim: true,
    },
    expYear: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mask: {
      type: String,
      required: true,
      trim: true,
    },
    tokenId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false },
);

const BillingSchema = new mongoose.Schema(
  {
    creditCards: [CreditCardSchema],
    customerId: String,
  },
  { _id: false },
);

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
    // unique: true,
  },
  role:{
    type:String,
    required: true,
    default:'student'
  },
  emailResetToken: String,
  emailResetExpires: Date,
  image: String,
  billing: BillingSchema,
  paymentId:
    {
      type: Array,
      ref: 'Payment',
    },
  courseId:
    {
      type: Array,
      ref: 'Course',
    },
},
{
  timestamps: true,
},
);

userSchema.virtual('profile').get(function () {
  const { email, _id, name } = this;
  return { email, _id, name };
});

module.exports = mongoose.model('User', userSchema);

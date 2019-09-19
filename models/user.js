const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required!'],
  },
  email: {
    type: String,
    required: [true, 'email is required!'],
  },
  password: {
    type: String,
    required: [true, 'password is required!'],
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/.test(v);
      },
      message: '{VALUE} Incorrect password format'
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
})
// UserSchema.set('validateBeforeSave', false); 自己校验

const User = mongoose.model('User', UserSchema)


module.exports = User;
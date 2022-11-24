import mongoose from 'mongoose';
/* import Student from './student.js'; */

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model('User', userSchema);
export default User;

import mongoose, { Schema } from 'mongoose'
import pkg from 'validator'

const { isEmail } = pkg;
const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true, 'This is a required Field']
    },
    username: {
        type: String,
        required: [true, 'This is a required Field'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'This is a required Field'],
        lowercase: true,
        validator: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'This is a required Field'],
        minlength: [8, 'Minimum length should be 8 characters'],
    },
})

const User = mongoose.model('User', userSchema);
export default User;
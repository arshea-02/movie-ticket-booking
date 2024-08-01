import  mongoose, { Schema } from 'mongoose'
import validator from 'validator';
import pkg from 'validator'

const { isEmail } = pkg;

const adminSchema = new Schema({
    name:{
        type: String,
        required: [true, 'This is a required field'],
    },
    dob:{
        type: Date,
        required: [true, 'This is a required field'],
    },
    email: {
        type: String,
        required: true,
        validator: [isEmail, 'Please enter a valid Email'],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, 'This is a required Field'],
        minlength: [8, 'Password should be atleast 8 characters long'],
    },
})

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
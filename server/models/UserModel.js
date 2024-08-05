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
        validator: [(password)=>pkg.matches(password, "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"),
            "Use special Characters, lower and upper case alphabets and digits"
        ],
    },
})

const User = mongoose.model('User', userSchema);
export default User;
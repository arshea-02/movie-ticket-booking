import  mongoose, { Schema } from 'mongoose'
import pkg from 'validator'

const { isEmail } = pkg;

const adminSchema = new Schema({
    adminId:{
        type: String,
        required: true,
        unique: true,
        length: 10,
    },
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
        validator: [(password)=>pkg.matches(password, "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"),
            "Use special Characters, lower and upper case alphabets and digits"
        ],
    },
})

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Admin from '../models/Adminmodel.js'
import handleErrors from './errorControl.js'
import createID from '../middleware/createID.js'
import 'dotenv/config'

const maxAge = 1 * 24 * 60 * 60;
const hashedPassword = (password)=>{
    return bcrypt.hash(password, 10);
}
const createToken = (id)=>{
    return jwt.sign({ id }, `${process.env.SECRET_KEY}`, {expiresIn: maxAge})
} 


const admin_signup_get = async (req, res)=>{
    res.render('signup');
}

const admin_signup_post =  async (req, res)=>{
    try{
        const {name, dob, email, password } = req.body;
        const hashedPwd = await hashedPassword(password);
        const newadminId = createID(name);
        const admin = new Admin({adminId: newadminId, name, dob, email, password: hashedPwd});
        await admin.save();
        res.status(201).json({ admin });

    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const admin_login_get = async (req, res)=>{
    res.render('login');
}

const admin_login_post = async (req, res)=>{
    const { adminId, password } = req.body;
    try{
       const admin = Admin.findOne({ adminId });
    
    if(!admin){
        const errors = {adminId: 'Inncorrect ID'};
        return res.status(401).json({ errors });
    }
    const checkMatchPasswords = bcrypt.compare(password, admin.password);
    if(!checkMatchPasswords){
        const errors = { password: "Incorrect Password"};
        return res.status(401).json({ errors });
    }
    const token = createToken(admin._id);
    res.cookie('jwt', token, {'httpOnly': true, maxAge: maxAge*1000});
    return res.status(200).json({ token });
}catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }
}

const update_admin_put = async (req, res)=>{
    const id = req.params.id;
    const { password } = req.body;

    try{
        const admin = await Admin.findByIdAndUpdate(id, { password: hashedPassword(password) });
        if(!admin){
            const errors = {adminId: 'User Not Found'};
            return res.status(401).json({ errors });
        }
        await admin.save();
        res.status(200).json({ admin });

    }catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }
}

const delete_admin = async (req, res)=>{
    const id = req.params.id;
    try{
        const admin = await Admin.findByIdAndDelete(id);
        if(!admin){
            const errors = 'User does not Exist';
            return res.status(401).json({ errors })
        }
        return res.status(200).json("Deleted Successfully");

    }catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }

}
 
export default { admin_signup_get, admin_signup_post, admin_login_get, admin_login_post, update_admin_put, delete_admin }
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/UserModel.js'
import handleErrors from './errorControl.js'
import createID from '../utils/createID.js'
import {sendVerificationEmail, sendResetPasswordEmail} from '../nodemailer/sendEmail.js'
import 'dotenv/config'

const maxAge = 1 * 24 * 60 * 60;
const hashedPassword = (password)=>{
    return bcrypt.hash(password, 10);
}
const createToken = (id, forgetPassword=false)=>{ 
    if(forgetPassword){
        return jwt.sign({ id }, process.env.SECRET_KEY, {expiresIn: 10*60*1000})
    }   
    return jwt.sign({ id }, process.env.SECRET_KEY, {expiresIn: maxAge})
}

const findUser = async (req, res) =>{
    try{
    const users = await User.find();
    if(!users){
        res.status(500).json('User not Found');
    }
    res.status(200).json(users);
}catch(err){console.log(err)}
}

const postSignup =  async (req, res)=>{
    let user;
    let verify;
    let isAdmin = false;
    try{
        const { fullname, username, email, password } = req.body;
        const hashedPwd = await hashedPassword(password);
        const verificationToken = createToken(email);
        if(email.endsWith('@admin.com')){
            const adminId = await createID(fullname); 
            isAdmin = true;
            user = new User({ fullname, username: adminId, email, password: hashedPwd, isAdmin, verificationToken });
        }else{
            user = new User({ fullname, username, email, password: hashedPwd, isAdmin, verificationToken });
        }
        verify = await sendVerificationEmail(user.email, verificationToken, user.username);
        if(verify !== verificationToken){
            return res.status(400).json("Verify your email");
        }
        await user.save();
        res.status(201).json({ user });
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

const postLogin = async (req, res)=>{
    const { username, password, forgotPassword } = req.body;
    try{
       const user = await User.findOne({username});
      
    if(!user){
        const errors = {username: 'Inncorrect Username'};
        return res.status(401).json({ errors });
    }
    if(forgotPassword){
        const response = await forgetPassword(username, user.email);
        if(response){
            return res.status(200).json("email sent");//.redirect('/user/reset-password');
        }
    }
    const checkMatchPasswords = await bcrypt.compare(password, user.password);
    if(!checkMatchPasswords){
        const errors = { password: "Incorrect Password"};
        return res.status(401).json({ errors });
    }
    const token = createToken(user._id.toString());
    res.cookie('jwt', token, {'httpOnly': true, maxAge: maxAge*1000});
    return res.status(200).json({ token });
}catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }
}

const forgetPassword = async(username, email)=>{
    try{
        const token = createToken(username, true);
        await sendResetPasswordEmail(email, token);
        return true;
    }catch(err){
        const errors = handleErrors(err);
        return{status: 405, message: {errors} }
    }
}

const resetPassword = async(req, res)=>{
    const token = req.params.token;
    const { password } = req.body;

    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        if(!verify){return res.status(401).json("Not Authorized")}
        const decode = jwt.decode(token);
        const username = decode.id;
        const user = await User.findOne({username});
        if(!user){
            res.status(401).json("User Does not Exist");
        }
        const newhashPasword = await hashedPassword(password); 
        user.password = newhashPasword;
        await user.save();
        res.status(205).json("Password Reset Successfully");
    }catch(err){
        const errors = handleErrors(err);
        console.log(err);
        res.status(401).json({ errors }); 
    }
}

const updateUser = async (req, res)=>{
    const id = req.params.id;
    const { password } = req.body;

    try{
        const user = await User.findByIdAndUpdate(id, { password: hashedPassword(password) });
        if(!user){
            const errors = {username: 'User Not Found'};
            return res.status(401).json({ errors });
        }
        res.status(200).json({ user });

    }catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }
}

const delUser = async (req, res)=>{
    const id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user){
            const errors = 'User does not Exist';
            return res.status(401).json({ errors })
        }
        return res.status(200).json("Deleted Successfully");

    }catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }

}
// is this a good way to logout?
const logout = async(req, res)=>{
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/')
}
 
export default { findUser, postSignup, postLogin, forgetPassword, resetPassword, updateUser, delUser, logout }
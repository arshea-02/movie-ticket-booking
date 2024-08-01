import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/UserModel.js'
import handleErrors from './errorControl.js'
import 'dotenv/config'

const maxAge = 1 * 24 * 60 * 60;
const hashedPassword = (password)=>{
    return bcrypt.hash(password, 10);
}
const createToken = (id)=>{
    return jwt.sign({ id }, `${process.env.SECRET_KEY}`, {expiresIn: maxAge})
} 

const user_signup_get = async (req, res)=>{
    res.render('signup');
}

const user_signup_post =  async (req, res)=>{
    try{
        const { fullname, username, email, password } = req.body;
        const hashedPwd = await hashedPassword(password);
        const user = new User({fullname, username, email, password: hashedPwd});
        await user.save();
        res.status(201).json({ user });

    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const user_login_get = async (req, res)=>{
    res.render('login');
}

const user_login_post = async (req, res)=>{
    const { username, password } = req.body;
    try{
       const user = User.findOne(username);
    
    if(!user){
        const errors = {username: 'Inncorrect Username'};
        return res.status(401).json({ errors });
    }
    const checkMatchPasswords = bcrypt.compare(password, user.password);
    if(!checkMatchPasswords){
        const errors = { password: "Incorrect Password"};
        return res.status(401).json({ errors });
    }
    const token = createToken(user._id);
    res.cookie('jwt', `${process.env.SECRET_KEY}`, {expiresIn: maxAge*1000});
    return res.status(200).json({ token });
}catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }
}

const update_user_put = async (req, res)=>{
    const id = req.params.id;
    const { fullname, username, password } = req.body;

    try{
        const user = await User.findByIdAndUpdate(id, {fullname, username, password: hashedPassword(password)});
        if(!user){
            const errors = {username: 'User Not Found'};
            return res.status(401).json({ errors });
        }
        await user.save();
        res.status(200).json({ user });

    }catch(err){
        const errors = handleErrors(err);
        res.status(401).json({ errors });
    }
}

const delete_user = async (req, res)=>{
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
 
export default { user_signup_get, user_signup_post, user_login_get, user_login_post, update_user_put, delete_user }
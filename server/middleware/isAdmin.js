
import User from '../models/UserModel.js'

async function isAdmin(req, res, next){
    try{
        const adminUsers = await User.find({ isAdmin: true });
        const isUserAdmin =  adminUsers.some((user)=> user.id === req.user);
        if(isUserAdmin){
            req.id = req.user;
            next();
        }
        else{
            res.status(403).json({message: 'Not Authorized'});
        }
    }catch(err){
        res.status(422).json('No Admin');
    }
}

export default isAdmin

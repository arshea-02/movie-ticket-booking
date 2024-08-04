import jwt from 'jsonwebtoken'
import 'dotenv/config'

function verifyToken(req, res, next){
    const token = req.cookies.jwt;
    if(!token){
        res.status(401).json('First login');
        //redirect('/login')
    }
    try{
        jwt.verify(token, `${process.env.SECRET_KEY}`);
        next();
    }
    catch(err){
        res.status(401).json({ error: 'Invalid Token'})
    }
}

export default verifyToken;
import jwt from 'jsonwebtoken'
import 'dotenv/config'

function verifyToken(req, res, next){
    const token = req.cookies.jwt;
    if(!token){
        res.status(401).json('First login');
        //redirect('/login')
    }
    try{
        const verify = jwt.verify(token, process.env.SECRET_KEY);
        if(!verify){
            res.status(401).json('Not Authorized')
        }
        const decode = jwt.decode(token);
        req.user = decode.id;
        next();
    }
    catch(err){
        res.status(401).json({ error: 'Invalid Token'})
    }
}

export default verifyToken;
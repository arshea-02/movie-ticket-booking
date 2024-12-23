import jwt from 'jsonwebtoken'
import 'dotenv/config'

function verifyToken(req, res, next){
    const token = req.cookies.jwt;
    //const token = req.headers.authorization?.split(' ')[1];
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
        return{status: 401, error: 'Invalid Token'}
    }
}

export default verifyToken;
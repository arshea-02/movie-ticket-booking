import express from 'express'
import userControllers from '../controllers/userController.js'
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.post('/signup', userControllers.postSignup);

router.post('/login', userControllers.postLogin);

router.put('/:id', verifyToken, userControllers.updateUser);

router.put('/reset-password/:token', userControllers.resetPassword);

router.delete('/:id', verifyToken, userControllers.delUser);

router.get('/logout', userControllers.logout);

//router.get('/login', userControllers.user_login_get);

//router.post('/login', userControllers.user_login_post);

export default router
import express, { Router } from 'express'
import userControllers from '../controllers/userController.js'

const router = express.Router();

router.get('/signup', userControllers.user_signup_get);

router.post('/signup', userControllers.user_signup_post);

router.get('/login', userControllers.user_login_get);

router.post('/login', userControllers.user_login_post);

router.put('/:id', userControllers.update_user_put);

router.delete('/:id', userControllers.delete_user);

export default router
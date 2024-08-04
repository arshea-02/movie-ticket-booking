import express from 'express'
import adminController from '../controllers/adminController.js';
import verifyToken from '../middleware/verifyToken.js';
import authAdminRoutes from './authAdminRoutes.js'

const router = express.Router();

router.get('/signup', adminController.admin_signup_get);

router.post('/signup', adminController.admin_signup_post);

router.get('/login', adminController.admin_login_get);

router.post('/login', adminController.admin_login_post);

router.get('/:id', verifyToken, authAdminRoutes);

export default router;

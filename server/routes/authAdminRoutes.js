import express from 'express'
import adminController from '../controllers/adminController.js';
import movieRoutes from './movieRoutes.js';

const router = express.Router();

router.get('/movies', movieRoutes);

router.put('/edit', adminController.update_admin_put);

router.delete('/delete', adminController.delete_admin);

export default router;
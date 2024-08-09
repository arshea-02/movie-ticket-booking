import express from 'express'
import isAdmin from '../middleware/isAdmin.js';
import verifyToken from '../utils/verifyToken.js';
import showController from '../controllers/showController.js';

const router = express.Router();

router.post('/add', verifyToken, isAdmin, showController.createShow);

router.put('/edit/:id', isAdmin, verifyToken, showController.editShow);

router.put('/delete/:id', isAdmin, verifyToken, showController.editShow);

router.get('/view/:movieId', showController.displayShows);

router.get('/:id', showController.reserveSeats);



export default router;
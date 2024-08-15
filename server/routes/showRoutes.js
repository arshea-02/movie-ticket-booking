import express from 'express'
import isAdmin from '../middleware/isAdmin.js';
import verifyToken from '../utils/verifyToken.js';
import showController from '../controllers/showController.js';

const router = express.Router();

router.post('/add', verifyToken, isAdmin, showController.createShow);

router.put('/edit/:id', verifyToken, isAdmin, showController.editShow);

router.delete('/delete/:id', verifyToken, isAdmin, showController.deleteShow);

router.get('/view/:movieId', verifyToken, showController.displayShows);

router.get('/:id', showController.reserveSeats);



export default router;
import express from 'express'
import bookingController from '../controllers/bookingController.js'
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.get('/:showId', verifyToken, bookingController.goTotForm);

router.post('/:showId', verifyToken, bookingController.bookSeat);

export default router;
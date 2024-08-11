
import express from 'express'
import movieContorller from '../controllers/movieController.js';
import isAdmin from '../middleware/isAdmin.js';
import verifyToken from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', movieContorller.movieIndex);

router.post('/add', verifyToken, isAdmin, movieContorller.postMovieAdd);

router.get('/:id', movieContorller.movieDetails);

router.put('/edit/:id', verifyToken, isAdmin, movieContorller.editMovie);

router.delete('/delete/:id', verifyToken, isAdmin, movieContorller.delMovie);

export default router;

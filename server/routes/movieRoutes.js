import express from 'express'
import movieContorller from '../controllers/movieController.js';

const router = express.Router();

router.get('/', movieContorller.movie_index);

router.post('/add', movieContorller.movie_add_post);

router.get('/add', movieContorller.movie_add_get);

router.put('/edit/:id', movieContorller.movie_edit_put);

router.delete('/delete/:id', movieContorller.movie_delete);

export default router;
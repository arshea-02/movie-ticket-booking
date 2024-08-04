import Movie from '../models/MovieModel.js'
import createID from '../middleware/createID.js';
import Admin from '../models/Adminmodel.js'

const movie_index = (req, res)=>{
    try{
        const movies = Movie.find().sort({ createdAt: -1 });
        res.status(200).json({ movies });
        //res.render('/movies/index');
    }catch(err){
        res.status(400).json('No movies');
    }
}

const movie_add_get = (req, res)=>{
    res.render('/movies/create');
}

const movie_add_post = async (req, res)=>{
    const { moviename, showdate, showtime, genre, rated } = req.body;
    try{
        const movieId = createID(moviename);
        const movie = new Movie({ movieId, moviename, showdate, showtime, genre, rated, adminId: Admin.adminId });
        await movie.save();
        res.status(201).json('Movie Added');
    }catch(err){
        res.status(400).json('Something went wrong');
    }
}

const movie_edit_put = async (req, res)=>{
    const id = req.params.id;
    const { moviename, showdate, showtime, genre, rated } = req.body;
    try{
        const movie = Movie.findByIdAndUpdate(id, {moviename, showdate, showtime, genre, rated });
        if(!movie){
            res.status(404).json('Movie not Found');
        }
        await movie.save();
        res.status(200).json({ movie });
    }catch(err){
        res.status(400).json('bad request')
    }
}

const movie_delete = async (req, res)=>{
    const id = req.params.id;
    try{
        const movie = Movie.findByIdAndDelete(id);
        if(!movie){
            res.status(404).json('Movie not found');
        }
        await movie.save();
        res.status(200).json('Movie deleted');
    }catch(err){
        res.status(400).json('Somethign went Wrong');
    }
}

export default { movie_add_get, movie_add_post, movie_edit_put, movie_delete, movie_index }
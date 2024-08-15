import Movie from '../models/MovieModel.js'
import User from '../models/UserModel.js'
import createID from '../utils/createID.js';
import cloudinary from '../middleware/cloudinary.js'

const movieIndex = async (req, res)=>{
    try{
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.status(200).json(movies);
    }catch(err){
        res.status(400).json('No movies', err);
    }
}

const movieDetails = async (req, res)=>{
    const id = req.params.id;
    try{
        const movie = await Movie.findById(id);
        const movieId = movie.movieId;
        res.redirect(`/shows/view/${movieId}`);
    }catch(err){
        res.status(404).json("Page not found");
    }
}

const postMovieAdd = async (req, res)=>{
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json('Image is Required');
    }
    const { poster } = req.files;
    const formats = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg', 'image/webp'];
    if(!formats.includes(poster.mimetype)){
        return res.status(400).json('Invalid File Type');
    }
    const { moviename, duration, genre, rated } = req.body;     
    try{
        const movieId = createID(moviename);
        const admin = await User.findById(req.id);
        const adminId = admin.username;

        const cloudinaryResponse = await cloudinary.uploader.upload(
            poster.tempFilePath
        ) 
        if(!cloudinaryResponse){
            return res.status(400).json('Unknown Cloudinary Error');
        }
        //console.log(cloudinaryResponse.secure_url);
        const movie = new Movie({ movieId, moviename, 
            poster: { public_id: cloudinaryResponse.public_id, url: cloudinaryResponse.secure_url},
            duration: duration + "mins", genre, rated, adminId });
        await movie.save();
        res.status(201).json({ secure_url: cloudinaryResponse.secure_url });
    }catch(err){
        console.log(err)
        res.status(400).json('Something went wrong');
    }
}

const editMovie = async (req, res)=>{
    const id = req.params.id;
    const { moviename, duration, genre } = req.body;
    try{
        const movie = Movie.findByIdAndUpdate(id, { moviename, duration, genre });
        if(!movie){
            res.status(404).json('Movie not Found');
        }
        await movie.updateOne();
        res.status(200).json({ movie });
    }catch(err){
        res.status(400).json('bad request')
    }
}

const delMovie = async (req, res)=>{
    const id = req.params.id;
    try{
        const movie = await Movie.findByIdAndDelete(id);
        if(!movie){
            res.status(404).json('Movie not found');
        }
        res.status(200).json('Movie deleted');
    }catch(err){
        console.log(err);
        res.status(400).json('Somethign went Wrong');
    }
}

export default { movieIndex, movieDetails, postMovieAdd, editMovie, delMovie }
import Show from '../models/ShowModel.js'
import Movie from '../models/MovieModel.js';
import createID from '../utils/createID.js';
import isShowValid from '../middleware/isShowValid.js';

const displayShows = async (req, res)=>{
    try{
        const movieId = req.params.movieId;
        const shows = await Show.find({movieId}).sort({createdAt: 1});
        if(shows.length===0){
            return res.status(204).json('No shows Exist for this Movie')
        }
        res.status(200).json(shows);
    }catch(err){
        res.status(400).json('No Shows', err);
    }
}

const reserveSeats = async (req, res)=>{
    const id = req.params.id;
    try{
        const show = await Show.findById(id);
        const showId = show.showId;
        res.status(200).redirect(`/bookseats/${showId}`);
    }catch(err){
        res.status(404).json("Page not found");
    }
}

const createShow = async (req, res)=>{
    const { moviename, showDate, startTime, endTime } = req.body;
    let show;
    try{
        const showId = "sh" + createID(moviename);
        const movie = await Movie.findOne({moviename});
        if(!movie){
            return res.status(404).json('Movie not Found');
        }
        const validShow = await isShowValid(showDate, startTime, endTime);
        if(!validShow){
            return res.status(validShow.status).json(validShow.message);
        }
        show = new Show({ showId, movieId: movie.movieId, showDate, startTime, endTime });
        
        await show.save();
        res.status(201).json('Show Created');
    
    }catch(err){
        console.log(err);
    }
}

const editShow = async (req, res)=>{
    const id = req.params.id
    const { showDate, startTime, endTime } = req.body;
    try{
        const show = await Show.findByIdAndUpdate(id, {showDate, startTime, endTime });
        if(!show){
            return res.status(404).json('Show not Found');
        }
        const validShow = await isShowValid(showDate, startTime, endTime);
        if(validShow===false){
            return res.status(validShow.status).json(validShow.message);
        }
        await show.save();
        res.status(201).json('Show Created');
    
    }catch(err){
        console.log(err);
    }
}

const deleteShow = async (req, res)=>{
    const id = req.params.id
    try{
        const show = await Show.findByIdAndDelete(id);
        if(!show){
            return res.status(404).json('Show not Found');
        }
        res.status(201).json('Show Deleted');
    }catch(err){
        console.log(err);
        res.status(500).json("Internal Server Error");
    }
}

export default { displayShows, reserveSeats, createShow, editShow, deleteShow };
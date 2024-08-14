import axios from 'axios';
import { useState } from 'react-dom'
import { useNavigate } from 'react-router-dom';

const AddMovie = () =>{
    const [inputMovie, setInputMovie] = useState({
        moviename: '',
        duration: '',
        genre: '',
        rated: ''
    });
    const navigate = useNavigate();
    const movieError = document.querySelector('.moviename.errors');
    //const movieError = document.querySelector('.movienaem.errors')
    const durationError = document.querySelector('.duration.errors');
    const genreError = document.querySelector('.genre.errors')
    const ratedError = document.querySelector('.rated.errors')


    const handleChange = (e) =>{
        setInputMovie({...inputMovie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        movieError.textContent='';
        durationError.textContent='';
        genreError.textContent='';
        ratedError.textContent='';

        try{
            const payload = {moviename: inputMovie.moviename, duration: inputMovie.duration, genre: inputMovie.genre, rated: inputMovie.rated}
            const response = await axios.post("http://localhost:3000/movies/add", payload);

            if(response.errors){
                movieError.textContent = response.errors.moviename;
                durationError.textContent = response.errors.duration;
                genreError.textContent = response.errors.genre;
                ratedError.textContent = response.errors.rated;
            }
            else{
                navigate('/');
            }

        }catch(err){console.log(err)}

    }
    return (
        <div className='card'>
            <h2>Add Movie</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label>Movie Name<p className='required'>*</p>
                <input type='text' name='moviename' value={inputMovie.moviename} onChange={handleChange} placeholder="Movie"/></label>
                <p className='moviename errors'></p>
                <label>Duration<p className='required'>*</p>
                <input type='text' name='duration' value={inputMovie.duration} onChange={handleChange} placeholder="Duration"/></label>
                <p className='duration errors'></p>
                <label>Genre<p className='required'>*</p>
                <input type='text' name='genre' value={inputMovie.genre} onChange={handleChange} placeholder="Genre"/></label>
                <p className='genre errors'></p>
                <label>Genre<p className='required'>*</p>
                <input type='text' name='genre' value={inputMovie.genre} onChange={handleChange} placeholder="Genre"/></label>
                <p className='genre errors'></p>
                <label>Rated<p className='required'>*</p>
                <input type='text' name='rated' value={inputMovie.rated} onChange={handleChange} placeholder="Rated"/></label>
                <p className='rated errors'></p>
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default AddMovie
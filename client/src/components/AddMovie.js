import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
//import cloudinary from 'cloudinary'
//Yimport cors from 'cors'
//import 'dotenv/config'
import '../assests/addForm.css'
import Header from './partials/Header'
import Footer from './partials/Footer'

const AddMovie = () =>{
    const [inputMovie, setInputMovie] = useState({
        moviename: '',
        duration: '',
        genre: '',
        rated: ''
    });
    const [inputPoster, setInputPoster] = useState('');
    const navigate = useNavigate();

    const movieError = document.querySelector('.moviename.errors');
    const posterError = document.querySelector('.poster.errors')
    const durationError = document.querySelector('.duration.errors');
    const genreError = document.querySelector('.genre.errors')
    const ratedError = document.querySelector('.rated.errors')
    const formData = new FormData();


    const handleChange = (e) =>{
        setInputMovie({...inputMovie,
            [e.target.name]: e.target.value
        });
    }

    const handlePoster = async(e) =>{
        const image = e.target.files[0];
        setInputPoster(image);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        movieError.textContent='';
        posterError.textContent='';
        durationError.textContent='';
        genreError.textContent='';
        ratedError.textContent='';

        try{

            formData.append('moviename', inputMovie.moviename);
            formData.append('poster', inputPoster);
            formData.append('duration', inputMovie.duration);
            formData.append('genre', inputMovie.genre);
            formData.append('rated', inputMovie.rated);

            const response = await axios.post("http://localhost:3000/movies/add", formData, 
                {headers: {Authorization: `Bearer ${Cookies.get('jwt') }`}});

            

            if(response.errors){
                movieError.textContent = response.errors.moviename;
                //posterError.textContent = response.errors.poster;
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
        <>
        <Header />
        <div className='card'>
            <h2>Add Movie</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label>Movie Name<p className='required'>*</p>
                <input type='text' name='moviename' value={inputMovie.moviename} onChange={handleChange} placeholder="Movie"/></label>
                <p className='moviename errors'></p>
                <label>Movie Poster<p className='required'>*</p>
                <input type='file' onChange={handlePoster} placeholder="poster"/></label>
                <p className='poster errors'></p>
                <label>Duration<p className='required'>*</p>
                <input type='text' name='duration' value={inputMovie.duration} onChange={handleChange} placeholder="Duration"/></label>
                <p className='duration errors'></p>
                <label>Genre<p className='required'>*</p>
                <input type='text' name='genre' value={inputMovie.genre} onChange={handleChange} placeholder="Genre"/></label>
                <p className='genre errors'></p>
                <label>Rated<p className='required'>*</p>
                <input type='text' name='rated' value={inputMovie.rated} onChange={handleChange} placeholder="Rated"/></label>
                <p className='rated errors'></p>
                <button type='submit'>Add</button>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default AddMovie
import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
//import cloudinary from 'cloudinary'
//Yimport cors from 'cors'
//import 'dotenv/config'
import '../assests/addForm.css'
import Header from './partials/Header'
import Footer from './partials/Footer'

const EditMovie = () =>{
    // const [movie, setMovie] = useState({
    //     moviename: '',
    //     duration: '',
    //     genre: '',
    // });
    const [editMovie, setEditMovie] = useState({
        moviename: '',
        duration: '',
        genre: '',
    });
    const { movieId } = useParams();
    const navigate = useNavigate();

    const getMovies = async() => {
        try{
            const movies = await axios.get("http://localhost:3000/movies");
            for(const mov of movies.data){
                if(mov._id === movieId){
                    setEditMovie(mov);
                }
            }
        }catch(err){console.log(err)}
    }

    useEffect(()=>{
        getMovies();
    }, [movieId]);

    const handleChange = (e) =>{
        setEditMovie({...editMovie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const payload = { moviename: editMovie.moviename, duration: editMovie.duration, genre: editMovie.genre}
            await axios.put(`http://localhost:3000/movies/edit/${movieId}`, payload, 
                {headers: {Authorization: `Bearer ${Cookies.get('jwt') }`}});

            navigate('/');

        }catch(err){console.log(err)}

    }
    return (
        <>
        <Header />
        <div className='card'>
            <h2>Update Movie</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label>Movie Name
                <input type='text' name='moviename' value={editMovie.moviename} onChange={handleChange} /></label>
                <label>Duration
                <input type='text' name='duration' value={editMovie.duration} onChange={handleChange} /></label>
                <label>Genre
                <input type='text' name='genre' value={editMovie.genre} onChange={handleChange} /></label>
                
                <button type='submit'>Update</button>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default EditMovie
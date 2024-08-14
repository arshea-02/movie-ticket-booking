import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Header from './partials/Header'
import Footer from './partials/Footer'
import MovieCard from './MovieCard'
import '../assests/moviecard.css'

const Movies = () =>{

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const isAdmin = localStorage.getItem('isAdmin');

    const getMovies = async () =>{
        try{
            const response = await axios.get('http://localhost:3000/movies');
            setMovies(response.data);
            setLoading(false);

        }catch(err){ setLoading(false);
            console.log(err);}
    }

    useEffect(()=>{
        localStorage.removeItem('movieId');
        localStorage.removeItem('movie');
        localStorage.removeItem('poster');

        getMovies();
    }, [])

    return(
        <>
        {loading ? (<div>loading</div>) : (
            <>
            <Header movies={movies} isAdmin={isAdmin}/>
            <div className='movie-container'>
                {movies.map((movie, index)=> (
                    <MovieCard key={index} movie={movie} isAdmin={isAdmin}/>
                ))}
            </div>
            <Footer />
            </>
        )}
        </>
    )
}

export default Movies
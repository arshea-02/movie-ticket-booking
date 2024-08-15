import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import '../assests/moviecard.css'

const MovieCard = ({ movie, isAdmin }) =>{
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const poster = localStorage.getItem('poster');
    //const isAdmin = localStorage.getItem('isAdmin');
    Cookies.set('jwt', token)

    const deleteMovie = async (movieId)=>{
        try{
            const response = await axios.delete(`http://localhost:3000/movies/delete/${movieId}`,{
                headers: {Authorization: `Bearer ${Cookies.get('jwt')}`}
            });

            if(!response){
                console.log('Error in deleting');
            }
        }catch(err){ console.log(err) };
    };

    const handleClick = (e) =>{
        if(e.target.classList.contains('del-btn')){
            const _id = e.target.parentElement.dataset.doc;
            deleteMovie(_id);
        }
        localStorage.removeItem('poster');
    }

    const handleLocalStorage = () =>{
        localStorage.setItem('movieId', movie.movieId )
        localStorage.setItem('poster', movie.poster)
        localStorage.setItem('movie', movie.moviename);
        navigate(`/${movie.movieId}/shows`)
    }
    
    return(
        <div className="movie-card">
            {isAdmin ? (<>
                <Link to='/' data-doc={movie._id}><button className='del-btn' onClick={handleClick}>Del</button></Link>
                <Link to='/editMovie'><button className='edit-btn'>Edit</button></Link>
            </>): <></>}
            <h3 className='content'>{movie.moviename}</h3>
            <img src={poster} alt={movie.moviename}/>
            <button id={movie.movieId} className='view-shows' onClick={handleLocalStorage}>View Shows</button>
        </div>
    )
}

export default MovieCard
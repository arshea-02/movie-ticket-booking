import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import '../assests/moviecard.css'

const MovieCard = ({ movie, isAdmin }) =>{
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
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
    }

    const handleLocalStorage = () =>{
        localStorage.setItem('movieId', movie.movieId )
        localStorage.setItem('poster', movie.poster.secure_url)
        localStorage.setItem('movie', movie.moviename);
        localStorage.setItem('duration', movie.duration);
        localStorage.setItem('genre', movie.genre);
        localStorage.setItem('rated', movie.rated);
        
        token? 
        navigate(`/${movie.movieId}/shows`) :
        navigate('/login');
    }
    
    return(
        <div className="movie-card">
            {isAdmin ? (<>
                <Link to='/' data-doc={movie._id}><button className='del-btn' onClick={handleClick}>Del</button></Link>
                <Link to={`/editMovie/${movie._id}`} ><button className='edit-btn'>Edit</button></Link>
            </>): <></>}
            <h3 className='content'>{movie.moviename}</h3>
            <img src={movie.poster.url} alt={movie.moviename}/>
            <button className='view-shows' onClick={handleLocalStorage}>View Shows</button>
        </div>
    )
}

export default MovieCard
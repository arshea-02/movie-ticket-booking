import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import '../assests/moviecard.css'
const MovieCard = ({ movie, isAdmin }) =>{
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    //const isAdmin = localStorage.getItem('isAdmin');
    Cookies.set('jwt', token)

    const trashcan = document.querySelector('.del-btn');
    trashcan.addEventListener('click', async ()=>{
        try{
            const response = await fetch(`/movies/delete/${trashcan.dataset.doc}`, {
                method: 'DELETE'
            });
            if(!response){
                console.log('Error in deleting');
            }
        }catch(err){ console.log(err) };
    });

    const handleLocalStorage = () =>{
        localStorage.setItem('movieId', movie.movieId )
        localStorage.setItem('poster', movie.posterURL)
        localStorage.setItem('movie', movie.moviename);
        navigate(`/${movie.movieId}/shows`)
    }
    
    return(
        <div className="movie-card">
            {isAdmin ? (<>
                <a href='/' data-doc={movie._id}><button className='del-btn' >Del</button></a>
                <Link to='/editMovie'><button className='edit-btn'>Edit</button></Link>
            </>): <></>}
            <h3 className='content'>{movie.moviename}</h3>
            <img src={movie.posterURL} alt={movie.moviename}/>
            <button id={movie.movieId} className='view-shows' onClick={handleLocalStorage}>View Shows</button>
        </div>
    )
}

export default MovieCard
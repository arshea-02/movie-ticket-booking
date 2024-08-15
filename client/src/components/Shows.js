import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import '../assests/shows.css'
const Shows = ({show}) =>{
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin');
    const movieId = localStorage.getItem('movieId');

    const deleteShow = async (showId)=>{
        try{
            const response = await axios.delete(`http://localhost:3000/shows/delete/${showId}`,{
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
            deleteShow(_id);
        }
    }

    const handleLocalStorage = () =>{
        localStorage.setItem('show', show.showId);
        navigate(`/${show.showId}/bookseats`);
    }
    return (
    <div className="show">
        <div className='content'>
            <h3>{show.showDate}</h3>
            <p><i>Start Time </i>{show.startTime}</p>
        </div>
        {isAdmin ? 
            (<><Link to={`/${movieId}/shows`} data-doc={show._id}><button className='del-btn' onClick={handleClick}>Del</button></Link>
                <Link to='/editShow'><button className='edit-btn'>Edit</button></Link>
            </>): <></>}
        <button id={show.showId} className='book-seat' onClick={handleLocalStorage}>Book Seat</button>
    </div>    
)
}

export default Shows
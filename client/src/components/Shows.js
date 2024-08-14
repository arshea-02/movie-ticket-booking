import { useNavigate, Link } from 'react-router-dom'
import '../assests/shows.css'
const Shows = ({show}) =>{
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin');

    const handleLocalStorage = () =>{
        localStorage.setItem('show', show.showId);
        navigate(`/${show.showId}/bookseats`);
    }
    return (
    <div className="show">
        {isAdmin ? (<>
            <a href='/' data-doc={show.showId}><button className='del-btn'>Del</button></a>
            <Link to='/editShow'><button className='edit-btn'>Edit</button></Link>
        </>):
        (<></>)}
        <div className='content'>
            <h3>{show.showDate}</h3>
            <p><i>Start Time </i>{show.startTime}</p>
        </div>
        <button id={show.showId} className='book-seat' onClick={handleLocalStorage}>Book Seat</button>
    </div>    
)
}

export default Shows
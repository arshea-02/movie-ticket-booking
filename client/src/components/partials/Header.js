import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import SearchBar from './SearchBar'
import 'D:/NodeJS/movie-ticket-booking/client/src/assests/header.css'

const Header = ({ movies })=> {

    const [filteredItems, setFilteredItems] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    useEffect(() => {
        setFilteredItems(movies);
        // if(!token){
        //     navigate('/login'); 
        // }
    }, [movies]);

    const handleSearch = (searchInput) => {
        const filtered = movies.filter((movie) =>
          movie.moviename.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleLogout = () =>{
        localStorage.clear();
        Cookies.remove('jwt');
        navigate('/')
    }

    return (
        <div className='header'>
            <Link to='/'><h2>TicketTap</h2></Link>
            
            {filteredItems ? (
                <>
                <SearchBar className="search" onSearch={handleSearch} />
                <ul>
                    {filteredItems.map((movie, index) => (
                        <li key={index}>{movie.moviename}</li>
                    ))}
                </ul></>) :
            (<div></div>)}
            <div className='buttons'>
            {console.log(isAdmin)}
            {isAdmin ?
                (<><Link to='/addmovie'><button>Add Movies</button></Link>
                <Link to='/addshows'><button>Add Shows</button></Link></>) :
                (<></>)
            }
            {token ?
                (<Link to='/'><button>Movies</button></Link>) :
                (<Link to='/signup'><button>Signup</button></Link>)
            }
            {token ? 
                (<Link onClick={handleLogout}><button>Logout</button></Link>) :
                (<Link to='/login'><button>Login</button></Link>)
                
            }
            </div>
        </div>
    );
}

export default Header
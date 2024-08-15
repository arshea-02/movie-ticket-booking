import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from 'axios'
//import Cookies from 'js-cookie'
import Footer from "./partials/Footer"
import Shows from "./Shows"
import Header from "./partials/Header"
import '../assests/displayShows.css'


const DisplayShows = () =>{
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const movieId = localStorage.getItem('movieId');
    const token = localStorage.getItem('token')
    const moviePoster = localStorage.getItem('poster');
    const moviename = localStorage.getItem('movie');

    const getShows = async() =>{
        try{
            const response = await axios.get(`http://localhost:3000/shows/view/${movieId}`,{
                headers: { Authorization: `Bearer ${token}`}
            });
            setShows(response.data);
            setLoading(false)
        }catch(err){ setLoading(false);console.log('Error', err)}
    }
    useEffect(()=>{
        localStorage.removeItem('show');
        if(!token || !movieId){
            navigate('/')
        }
        getShows();
    }, [])
    return(
        <>
            {loading ? (<div>loading</div>) :
            (<>
                <Header />
                <div className='show-container'>
                    <img src={moviePoster} alt='Movie Poster' />
                    <div className="header">
                        <h1>{moviename}</h1>
                    </div>
                    <Link to='/addshow'><button className='add-show'>Add Shows</button></Link>

                    {shows? (
                        shows.map((show, index)=>(
                        <Shows key={index} show={show}/>)))
                        :
                        <></>
                    }
                </div>
                 <Footer />
            </>)}
        </>
    )
}

export default DisplayShows
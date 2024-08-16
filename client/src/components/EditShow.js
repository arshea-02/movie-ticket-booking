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

const EditShow = () =>{

    const [editShow, setEditShow] = useState({
        showDate: '',
        startTime: '',
        endTime: '',
    });
    const { showId } = useParams();
    const navigate = useNavigate();

    const movieId = localStorage.getItem('movieId');

    const getShows = async() => {
        try{
            const shows = await axios.get(`http://localhost:3000/shows/view/${movieId}`);
            for(const show of shows.data){
                if(show._id === showId){
                    setEditShow(show);
                }
            }
        }catch(err){console.log(err)}
    }

    useEffect(()=>{
        getShows();
    }, [showId]);

    const handleChange = (e) =>{
        setEditShow({...editShow,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            const payload = { showDate: editShow.showDate, startTime: editShow.startTime, endTime: editShow.endTime}
            await axios.put(`http://localhost:3000/shows/edit/${showId}`, payload, 
                {headers: {Authorization: `Bearer ${Cookies.get('jwt') }`}}
            );

            navigate( `/${movieId}/shows`);
        }catch(err){console.log(err)}

    }
    return (
        <>
        <Header />
        <div className='card'>
            <h2>Update Show</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label>Date
                <input type='date' name='showDate' value={editShow.showDate} onChange={handleChange} /></label>
                <label>Start Time
                <input type='time' name='startTime' value={editShow.startTime} onChange={handleChange} /></label>
                <label>End Time
                <input type='time' name='endTime' value={editShow.endTime} onChange={handleChange} /></label>
                
                <button type='submit'>Update</button>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default EditShow
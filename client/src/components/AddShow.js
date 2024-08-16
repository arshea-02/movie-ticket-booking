

import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import '../assests/addForm.css'
import Header from './partials/Header'
import Footer from './partials/Footer';

const AddShow = () =>{
    const [inputShow, setInputShow] = useState({
        date: '',
        startTime: '',
        endTime: '',
    });
    const navigate = useNavigate();
    const movieId = localStorage.getItem('movieId');
    const moviename = localStorage.getItem('movie')
    const dateError = document.querySelector('.date.errors');
    const startTimeError = document.querySelector('.start.errors');
    const endTimeError = document.querySelector('.end.errors')


    const handleChange = (e) =>{
        setInputShow({...inputShow,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        dateError.textContent='';
        startTimeError.textContent='';
        endTimeError.textContent='';

        try{

            const payload = {moviename: moviename, showDate: inputShow.date, startTime: inputShow.startTime, endTime: inputShow.endTime}
            console.log(payload);
            const response = await axios.post("http://localhost:3000/shows/add", payload, 
                {headers: {Authorization: `Bearer ${Cookies.get('jwt') }`}});

            

            if(response.errors){
                dateError.textContent = response.errors.showDate;
                startTimeError.textContent = response.errors.startTime;
                endTimeError.textContent = response.errors.endTime;
            }
            else{
                navigate(`/${movieId}/shows`);
            }

        }catch(err){console.log(err)}

    }
    return (
        <>
        <Header />
        <div className='card'>
            <h2>Add Show</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label>Date<p className='required'>*</p>
                <input type='date' name='date' value={inputShow.date} onChange={handleChange} placeholder="dd/mm/yyyy"/></label>
                <p className='date errors'></p>
                <label>Start Time<p className='required'>*</p>
                <input type='time' name='startTime' value={inputShow.startTime} onChange={handleChange} placeholder="Start Time"/></label>
                <p className='start errors'></p>
                <label>End Time<p className='required'>*</p>
                <input type='time' name='endTime' value={inputShow.endTime} onChange={handleChange} placeholder="End Time"/></label>
                <p className='end errors'></p>
                <button type='submit'>Add</button>
            </form>
        </div>
        <Footer />
        </>
    )
}

export default AddShow
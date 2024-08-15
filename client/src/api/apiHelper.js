import axios from 'axios'
import cors from 'cors'

export const getMovies = async (next) =>{
    try{
        const response = await axios.get('http://localhost:3000/movies');
        return response.data;
    }catch(err){console.log(err);}
}


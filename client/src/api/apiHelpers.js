import axios from 'axios'

export const getMovies = async() =>{
    try{
    const response = await axios.get('http://localhost:3000/movies');
    return response.data;
    }catch(err){ console.log(err); return []}
}
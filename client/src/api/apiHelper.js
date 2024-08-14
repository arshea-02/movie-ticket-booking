import axios from 'axios'

const getMovies = async (next) =>{
    try{
        const response = await axios.get('http://localhost:3000/movies');
        return response.data;
    }catch(err){console.log(err);}
}

export default getMovies
import Show from '../models/ShowModel.js'

const displayAvailableSeats = async(showId)=>{
    try{
    const show = await Show.findOne({showId});
    const availableSeats = show.totalSeats - show.bookedSeats.length + 1;
    if(availableSeats===0){
        return {message: "Show is Booked"}
    }
    return availableSeats;
    }catch(err){
        console.log(err);
    }
}
export default displayAvailableSeats;
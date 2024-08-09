import Seat from '../models/SeatModel.js'

const isSeatAvailable = async (showId, userId, seatNo)=>{
    const seat = await Seat.findOne({showId, userId, seatNo})
    if(!seat){
        return true;
    }
    return false;
}
export default isSeatAvailable;
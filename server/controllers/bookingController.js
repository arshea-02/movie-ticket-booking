import Seat from '../models/SeatModel.js'
import Show from '../models/ShowModel.js'
import User from '../models/UserModel.js'
import isSeatAvailable from '../middleware/isSeatAvailable.js'
import displayAvailableSeats from '../middleware/displayAvailableSeats.js'
import handleError from './errorControl.js'

async function costOfSeatType(seatType){
    const seatTypeSchema = Seat.schema.path('seatType');
    const costSchema = Seat.schema.path('cost');
    const index = await seatTypeSchema.options.enum.indexOf(seatType);
    return costSchema.options.enum[index];
}

const goTotForm = (req, res)=>{
    res.status(200).json('You can Reserve Seats Now');
}

const bookSeat = async(req, res)=>{
    const showId = req.params.showId;
    const { seatNo, seatType} = req.body;
    const _id = req.user;
    let isBooked = false;
    try{
        const {username: userId} = await User.findOne({_id}, 'username');
        const checkUser = await Seat.findOne({userId, showId});
        if(checkUser){
            return res.status(429).json('Too Many Requests');
        }
        const availableSeats = await displayAvailableSeats(showId);
        if(typeof(availableSeats) === Object){
            return res.status(403).json(availableSeats.message)
        }
        for(const seat of seatNo){
            if(seat>50){return res.status(406).json("Enter a Valid Value")}
            isBooked = await isSeatAvailable(showId, userId, seat);
            if(!isBooked){
                return res.status(403).json(`Seat ${seat} not Avilable`);
            }
        }
        const cost = await costOfSeatType(seatType);
        const seat = new Seat({ seatNo, seatType, cost, isBooked: true, userId, showId });

        await seat.save();
        await Show.updateOne({showId}, { bookedSeats: seatNo });
        res.status(202).json('Seat Booked')
    }catch(err){
        console.log(err);
        const errors = handleError(err);
        res.status(400).json({errors}, 'Bad Request');
    }
}

export default { goTotForm, bookSeat };
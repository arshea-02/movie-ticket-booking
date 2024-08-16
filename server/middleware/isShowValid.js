import Show from '../models/ShowModel.js'
import convertTimeToMinutes from '../utils/convertTimeToMinutes.js';

const isShowValid = async(showDate, startTime, endTime)=>{
     
    try{
        const showsOnSameDay = await Show.find({showDate})
        if(showsOnSameDay){    
            const overlappingShows = showsOnSameDay.some(show => {
                const showStartTime = convertTimeToMinutes(show.startTime);
                const showEndTime = convertTimeToMinutes(show.endTime);
                const newShowStartTime = convertTimeToMinutes(startTime);
                const newShowEndTime = convertTimeToMinutes(endTime);

                return (
                    newShowStartTime < showEndTime &&
                    newShowEndTime > showStartTime
                ) 
            });
            if(overlappingShows){
                return { status: 409, message: "Time slot not available"};
            }
        }
        return true;
    }catch(err){
        console.log(err)
        return { status: 409, message: "Time slot not available"};
    }
}

export default isShowValid;
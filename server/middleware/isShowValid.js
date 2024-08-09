import Show from '../models/ShowModel.js'
import convertTimeToMinutes from '../utils/convertTimeToMinutes.js';

const isShowValid = async(showDate, startTime, endTime)=>{
     
    try{
        const showsOnSaneDay = await Show.find({showDate})
        if(showsOnSaneDay){    
            const overlappingShows = showsOnSaneDay.some(show => {
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
                return false;
            }
        }
        return true;
    }catch(err){
        console.log(err)
        return { status: 409, message: "Time slot not available"};
    }
}

export default isShowValid;
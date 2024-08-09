
function convertTimeToMinutes(time){
    const [hours, minutes] = time.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
}

export default convertTimeToMinutes;
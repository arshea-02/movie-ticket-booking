import mongoose, { Schema } from 'mongoose'

const showSchema = new Schema({
    showId:{
        type: String,
        required: true,
    },
    movieId:{
        type: String,
        ref: "Movie",
    },
    showDate:{
        type: String,
        required: true,
    },
    startTime:{
        type: String,
        validate: { 
            validator: function(v){
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            }
        },
    },
    endTime:{
        type: String,
        validate: { 
            validator: function(v){
                return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(v);
            }
        },
    },
    totalSeats:{
        type: Number,
        default: 50,
    },
    bookedSeats:{ type: [Number], ref: "Seat", default: [null]},
}, {timestamps: true})

export default mongoose.model("Show", showSchema);
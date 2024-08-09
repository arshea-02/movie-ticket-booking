import mongoose, { Schema } from "mongoose";

const seatSchema = new Schema({
    seatNo:{
        type: [Number],
        required: true,
    },
    // screenNo:{
    //     type: Number,
    //     ref: "Screen",
    //     required: true,
    // },
    seatType:{
        type: String,
        enum: ["silver", "gold", "sofa"],
        required: true,
    },
    cost:{
        type: Number,
        enum: [500, 1000, 1500],
        required: true,
    },
    isBooked:{
        type: Boolean,
        default: false,
    },
    userId:{
        type: String,
        ref: "User",
        required: true,
    },
    showId:{
        type: String,
        ref: "Show",
        required: true,
    },
})

export default mongoose.model('Seats', seatSchema);
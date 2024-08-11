import mongoose, { mongo, Schema } from 'mongoose'

const movieSchema = new Schema({
    movieId:{
        type: String,
        required: true,
        unique: true,
    },
    moviename: {
        type: String,
        required: [true, "This is a required Field"],
    },
    posterURL:{
        type: String,
        required: true,
    },
    duration:{
        type: String, //in minutes
    },
    genre:{
        type: String,
        enum: ["Horror", "Anime", "Romance", "Action", "Mystery"],
    },
    rated: {
        type: String,
        enum: ["G", "PG", "PG-13", "R", "NC-17"],
        required: true,
    },
    adminId:{
        type: String,
        required: true,
    },
}, {timestamps: true})

export default mongoose.model('Movie', movieSchema);
import mongoose, { Schema } from 'mongoose'

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
    showdate:{
        type: Date,
        required: [true, "This is a Required Field"],
    },
    showtime:{
        type: Date,
        required: [true, 'This is a required field'],
    },
    genre:{
        type: String,
        enum: ["Horror", "Anime", "Romance", "Action", "Mystery"],
    },
    rating:{
        //five stars
    },
    rated: {
        enum: ["G", "PG", "PG-13", "R", "NC-17"],
    },
    adminId:{
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
        required: true,
    },
}, {timestamp: true})

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;
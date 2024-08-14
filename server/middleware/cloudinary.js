import { v2 as cloudinary }  from 'cloudinary';
import 'dotenv/config'
import dotenv from 'dotenv'

dotenv.config({
    path: 'D:/NodeJS/movie-ticket-booking/server/.env'
});

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET,
});
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import 'dotenv/config'
import userRoutes from './routes/userRoute.js'
import movieRoutes from './routes/movieRoutes.js'
import showRoutes from './routes/showRoutes.js'
import bookingRoutes from  './routes/bookingRoutes.js'

const PORT = process.env.SERVER_PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const connection = async()=>{
    try{
        const _ = await mongoose.connect(process.env.DB_STRING);
        console.log('Connected to DB');
    }catch(err){console.log('Something went wrong')}
}

connection();

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.get('/', (req, res)=>{
    res.status(200).redirect('/movies')
});

app.use('/user', userRoutes);
app.use('/movies', movieRoutes);
app.use('/shows', showRoutes);
app.use('/bookseats', bookingRoutes);

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`)
});

import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import userRoutes from './routes/userRoute.js'
import adminRoutes from './routes/adminRoutes.js'

const PORT = process.env.SERVER_PORT;
const app = express();
app.use(express.json());
app.use(cookieParser());


const connection = async()=>{
    try{
        const _ = await mongoose.connect(process.env.DB_STRING);
        console.log('Connected to DB')
    }catch(err){console.log('Error Connecting to DB', err)}
}

connection();
app.get('/', (req, res)=>{
    res.redirect('/movies')
})
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);


app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`)
});

import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'

const PORT = 3000;
const app = express();
app.use(express.json());


const connection = async()=>{
    try{
        const _ = await mongoose.connect(`mongodb+srv://arsheaatif04:${process.env.DB_PASSWORD}@cluster0.ptptxkx.mongodb.net/movie-ticket-reservation?retryWrites=true&w=majority&appName=Cluster0`);
        console.log('Connected to DB')
    }catch(err){console.log('Error Connecting to DB', err)}
}

connection();
app.use('/', userRouter);

app.listen(PORT, ()=>{
    console.log(`App listening on ${PORT}`)
});

// app.get('/', (req,res)=>{
//     res.send('Hello World!')
// })

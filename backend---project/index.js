import express, { request, response } from"express"
import {PORT, mongoDBURL} from './review.js'
import mongoose from 'mongoose';
import cors from 'cors';
import {Book} from './models/booksmodels.js'; 
import booksRoute from './routes/booksRoute.js'; 

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response)=>{
    console.log(request);
    return response.status(200).send('welcome to my project')
})

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is running in port: ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})
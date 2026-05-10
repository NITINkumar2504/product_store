import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

app.use(express.json()); // allow us to accept JSON data in req.body

import userRouter from './routes/product.routes.js'
app.use('/api/products', userRouter)

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:8000')
})

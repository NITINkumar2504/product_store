import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import path from 'path' 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000
const __dirname = path.resolve();

app.use(express.json()); // allow us to accept JSON data in req.body

import userRouter from './routes/product.routes.js'
app.use('/api/products', userRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('/*path', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log('Server started at http://localhost:8000')
})

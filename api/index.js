import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './Routes/userRoute.js';
import authRoutes from './Routes/authRoute.js';
import postRoutes from './Routes/postRoute.js';
import commentRoutes from './Routes/commentRoute.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();


mongoose.connect(process.env.MONGO).then(()=> {console.log('MongoDB is connected')}).catch((err)=>{});

const app = express();
const __dirname = path.resolve();


app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: ["https://divulge.onrender.com","https://thedivulge.vercel.app","http://localhost:5173"], credentials: true,}));

app.listen(3000, ()=>{
    console.log('Server is running on port 3000!!');
});

app.use('/blog/user', userRoutes);
app.use('/blog/auth', authRoutes);
app.use('/blog/post', postRoutes);
app.use('/blog/comment', commentRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));

//whatever url otherthan user,auth,post,comment its going to run index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use ((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    });
});
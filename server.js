import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/userRoute.js';

dotenv.config();

const app = express();
app.use(express.json())
app.get('/',(req,res)=>{
    res.json({success:"Server running"});
})

app.use('/api/users',userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
    
})
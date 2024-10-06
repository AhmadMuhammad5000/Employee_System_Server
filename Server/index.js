import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import  env from 'dotenv/config'

import { adminRouter } from './routes/admin.js';

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors({
    origin: [process.env.CLIENT_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());

// Admin Router
app.use('/auth', adminRouter);

app.listen(port, () => {
    console.log(`Server Running...${port}`)
});
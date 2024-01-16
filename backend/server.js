import express from 'express';
import http from 'http';
import cors from 'cors';
import dotevn from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
dotevn.config();
connectDB();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('api server is running');
});
app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});

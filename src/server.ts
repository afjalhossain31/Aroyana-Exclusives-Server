import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import itemRoutes from './routes/itemRoutes'; 
import authRoutes from './routes/authRoutes'; // Auth রাউট ইম্পোর্ট করা হলো
import paymentRoutes from "./routes/paymentRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API রাউটগুলো যুক্ত করা হলো
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes); // ইউজারের জন্য নতুন API লিংক

app.use('/api/payment', paymentRoutes); // পেমেন্ট রাউট

app.get('/', (req: Request, res: Response) => {
  res.send('Aroyana Exclusives Server is Running Perfectly!');
});

const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
  });
};

startServer();
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import itemRoutes from './routes/itemRoutes';
import authRoutes from './routes/authRoutes';
import paymentRoutes from "./routes/paymentRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Aroyana Exclusives Server is Running Perfectly! ');
});
 
app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", orderRoutes);

const startServer = async () => {
  await connectDB();
  

  if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
};

startServer();

module.exports = app;
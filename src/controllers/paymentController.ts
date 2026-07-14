import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

import { getDB } from "../config/db"; 
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-12-18.acacia' as any, 
});

export const createCheckoutSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items, user } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({ success: false, message: "Cart items are missing or empty" });
      return;
    }

    const lineItems = items.map((item: any) => {
      const validImage = item.image && item.image.startsWith('http') 
        ? encodeURI(item.image) 
        : "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=150";

      const parsedPrice = parseFloat(item.price);

      return {
        price_data: {
          currency: 'usd', 
          product_data: {
            name: item.name || item.title || "Aroyana Exclusive Item",
            images: [validImage],
          },
          unit_amount: Math.round(parsedPrice * 100), 
        },
        quantity: parseInt(item.quantity) || 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `http://localhost:3000/success`, 
      cancel_url: `http://localhost:3000/explore`,     
    });

    // Total amount calculation for MongoDB storage
    const totalAmount = items.reduce((sum: number, item: any) => sum + (parseFloat(item.price) * (item.quantity || 1)), 0);

    const newOrder = {
      userName: user?.name || "Guest User",
      userEmail: user?.email || "guest@example.com",
      transactionId: session.id,
      items: items,
      totalAmount: totalAmount,
      paymentStatus: "Paid", 
      orderStatus: "Processing",
      createdAt: new Date() 
    };

    const db = getDB();
    await db.collection("orders").insertOne(newOrder);

    // Respond with the session URL for the frontend to redirect

    res.status(200).json({ success: true, url: session.url });
  } catch (error: any) {
    console.error('🚨 [SERVER STRIPE/DB ERROR]:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
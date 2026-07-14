// src/controllers/orderController.ts
import { Request, Response } from "express";
import { getDB } from "../config/db";

export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const rawEmail = req.params.email;
        const email = (Array.isArray(rawEmail) ? rawEmail[0] : rawEmail).trim();
        
        console.log("Searching orders for email (Cleaned):", email);

        const db = getDB();

        const orders = await db.collection("orders")
            .find({ 
                userEmail: { $regex: new RegExp(`^${email}$`, 'i') } 
            })
            .sort({ createdAt: -1 })
            .toArray();
            
        console.log("Found orders count:", orders.length);

        res.status(200).json({ success: true, orders });
    } catch (error: any) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ success: false, message: "Server Error!" });
    }
};
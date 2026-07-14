// src/routes/orderRoutes.ts
import express from "express";
import { getUserOrders } from "../controllers/orderController";

const router = express.Router();

// User orders fetch route to get all orders for a specific user by email
router.get("/user/:email", getUserOrders);

export default router;
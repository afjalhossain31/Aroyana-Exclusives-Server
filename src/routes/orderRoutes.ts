// src/routes/orderRoutes.ts
import express from "express";
import { getUserOrders } from "../controllers/orderController";

const router = express.Router();

// ইউজারের ইমেইল দিয়ে অর্ডার ফেচ করার API
router.get("/user/:email", getUserOrders);

export default router;
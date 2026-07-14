// src/routes/analyticsRoutes.ts

import express from "express";
import { getDashboardStats } from "../controllers/analyticsController";

const router = express.Router();
router.get("/stats", getDashboardStats);

export default router;
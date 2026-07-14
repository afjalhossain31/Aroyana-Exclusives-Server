// src/controllers/analyticsController.ts
import { Request, Response } from "express";
import { getDB } from "../config/db";

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const db = getDB();
    const orders = await db.collection("orders").find({}).toArray();

    // বারের নাম অনুযায়ী রেভিনিউ হিসাব করার জন্য ডিফল্ট অবজেক্ট
    const dayStats: Record<string, number> = {
      Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0,
    };

    let totalRevenue = 0;

    orders.forEach((order) => {
      // মোট রেভিনিউ
      totalRevenue += order.totalAmount || 0;

      // বারের নাম বের করা (যেমন: Mon, Tue)
      if (order.createdAt) {
        const date = new Date(order.createdAt);
        const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
        if (dayStats[dayName] !== undefined) {
          dayStats[dayName] += order.totalAmount || 0;
        }
      }
    });

    // Recharts-এর জন্য সঠিক ফরম্যাটে ডাটা সাজানো
    const chartData = [
      { name: "Mon", revenue: dayStats["Mon"] },
      { name: "Tue", revenue: dayStats["Tue"] },
      { name: "Wed", revenue: dayStats["Wed"] },
      { name: "Thu", revenue: dayStats["Thu"] },
      { name: "Fri", revenue: dayStats["Fri"] },
      { name: "Sat", revenue: dayStats["Sat"] },
      { name: "Sun", revenue: dayStats["Sun"] },
    ];

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      totalRevenue: totalRevenue,
      chartData,
    });
  } catch (error: any) {
    console.error("Analytics Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
import express from "express";
import { authMiddleware } from "./authMiddleware/authMiddleware.js";
import { fetchOrders } from "./controller/orderController.js";

const app = express();

app.get("/orders", authMiddleware, fetchOrders);

export default app;
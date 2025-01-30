import express from "express";
import { createOrder, deleteOrderById, getOrders , getOrdersByUser ,updateOrderById } from "../controllers/order.controllers.js";

const router = express.Router()

router.post("/", createOrder)
router.get("/", getOrders)
router.get("/user/:id", getOrdersByUser)
router.put("/:id", updateOrderById)
router.delete("/:id", deleteOrderById)

export default router
import express from "express";
import { createProduct, deleteProductById, getProducts, getProductById, updateProductById } from "../controllers/product.controllers.js";

const router = express.Router()

router.post("/", createProduct)
router.get("/", getProducts)
router.get("/:id", getProductById)
router.delete("/:id", deleteProductById)
router.put("/:id", updateProductById)

export default router
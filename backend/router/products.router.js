import express from "express";
import { createProduct, deleteProductById, getProducts, getProductById, updateProductById } from "../controllers/product.controllers.js";
import protectRouterToken from "../middleware/protectRouterToken.js";

const router = express.Router()

router.post("/",protectRouterToken, createProduct)
router.get("/", getProducts)
router.get("/:id", getProductById)
router.delete("/:id", protectRouterToken,deleteProductById)
router.put("/:id",protectRouterToken, updateProductById)

export default router
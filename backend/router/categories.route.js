import express from "express";
import { createCategory, deleteCategoryById, getCategories , getCategoryById, updateCategoryById } from "../controllers/category.controllers.js";
import protectRouterToken from "../middleware/protectRouterToken.js";

const router = express.Router()

router.post("/",protectRouterToken, createCategory)
router.get("/", getCategories)
router.get("/:id", getCategoryById)
router.delete("/:id", protectRouterToken,deleteCategoryById)
router.put("/:id",protectRouterToken, updateCategoryById)

export default router
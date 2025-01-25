import express from "express";
import { createCategory, deleteCategoryById, getCategories , getCategoryById, updateCategoryById } from "../controllers/category.controllers.js";

const router = express.Router()

router.post("/", createCategory)
router.get("/", getCategories)
router.get("/:id", getCategoryById)
router.delete("/:id", deleteCategoryById)
router.put("/:id", updateCategoryById)

export default router
import express from "express";
import { createAge, deleteAgeById, getAges , getAgesById } from "../controllers/age.controllers.js";

const router = express.Router()

router.post("/", createAge)
router.get("/", getAges)
router.get("/:id", getAgesById)
router.delete("/:id", deleteAgeById)

export default router
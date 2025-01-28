import express from "express";
import { createAge, deleteAgeById, getAges , getAgesById , updateAgeById } from "../controllers/age.controllers.js";

const router = express.Router()

router.post("/", createAge)
router.get("/", getAges)
router.get("/:id", getAgesById)
router.put("/:id", updateAgeById)
router.delete("/:id", deleteAgeById)

export default router
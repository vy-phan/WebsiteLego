import express from "express";
import { createAge, deleteAgeById, getAges , getAgesById , updateAgeById } from "../controllers/age.controllers.js";
import protectRouterToken from "../middleware/protectRouterToken.js";

const router = express.Router()

router.post("/", protectRouterToken, createAge)
router.get("/", getAges)
router.get("/:id", getAgesById)
router.put("/:id",protectRouterToken, updateAgeById)
router.delete("/:id", protectRouterToken, deleteAgeById)

export default router
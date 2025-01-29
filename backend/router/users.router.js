import express from "express";
import { register, login, logout , getUserById } from "../controllers/auth.controllers.js";

const router = express.Router()

router.post("/signup", register)
router.post("/login", login)
router.post("/logout", logout)
router.get("/:id", getUserById)

export default router
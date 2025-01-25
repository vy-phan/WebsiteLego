import express from "express";
import { createReviewByProductId, deleteReview, getReviews, updateReview } from "../controllers/review.controllers.js";  

const router = express.Router()

router.post('/', createReviewByProductId)
router.get('/', getReviews)
// router.get('/product/:id', getReviewsByProdudctId)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

export default router
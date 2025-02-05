import express from "express";
import { createReviewByProductId, deleteReview, getReviews, updateReview } from "../controllers/review.controllers.js";  
import protectRouterToken from "../middleware/protectRouterToken.js";

const router = express.Router()

router.post('/',protectRouterToken, createReviewByProductId)
router.get('/', getReviews)
// router.get('/product/:id', getReviewsByProdudctId)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)

export default router
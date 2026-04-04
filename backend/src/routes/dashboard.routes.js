import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { createQuizManul, createQuizwithAI, getQuizHistroy, getRecentQuiz } from "../controller/dashboard.controller.js";

const router = express.Router();

router.post("/create",protectedRoute,createQuizManul);
router.post("/generate",protectedRoute,createQuizwithAI);
router.get("/recent",protectedRoute,getRecentQuiz);
router.get("/history",protectedRoute,getQuizHistroy);

export default router;
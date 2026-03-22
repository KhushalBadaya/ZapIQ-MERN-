import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { createQuizManul, getQuizHistroy, getRecentQuiz } from "../controller/dashboard.controller.js";

const router = express.Router();

router.post("/quiz-create-manul",protectedRoute,createQuizManul);
router.get("/recent-quiz",protectedRoute,getRecentQuiz);
router.get("/histroy",protectedRoute,getQuizHistroy);

export default router;
import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getQuiz, result, submit } from "../controller/quiz.controller.js";

const router = express.Router()
router.get("/api/quiz/:id",protectedRoute,getQuiz);
router.post("/api/quiz/:id/submit",protectedRoute,submit);
router.post("/api/quiz/:id/result",protectedRoute,result);

export default router;
import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getQuiz, result, submit } from "../controller/quiz.controller.js";

const router = express.Router()
router.get("/:id",getQuiz);
router.post("/:id/submit",protectedRoute,submit);
router.get("/:id/result",protectedRoute,result);

export default router;
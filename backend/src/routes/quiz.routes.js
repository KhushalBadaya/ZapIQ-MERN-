import express from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import { result, submit } from "../controller/quiz.controller";

const router = express.Router()
router.get("/api/quiz/:id");
router.post("/api/quiz/:id/submit",protectedRoute,submit);
router.post("/api/quiz/:id/result",protectedRoute,result);
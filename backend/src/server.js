import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import quizRoutes from "./routes/quiz.routes.js";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // EXACT match
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRoutes);
app.use("/api/dashboard/", dashboardRoutes);
app.use("/api/quiz/", quizRoutes);
connectDB().then(() => {
  app.listen(ENV.PORT, () => console.log("Sever is running on port 3000"));
});

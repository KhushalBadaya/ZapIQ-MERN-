import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import quizRoutes from "./routes/quiz.routes.js"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.endsWith(".vercel.app") || origin === "http://localhost:5173") {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use("/api/auth/",authRoutes);
app.use("/api/dashboard/",dashboardRoutes);
app.use("/api/quiz/",quizRoutes);
connectDB().then(()=>{
    app.listen(ENV.PORT,()=>console.log("Sever is running on port 3000"));
})


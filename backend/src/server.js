import express from "express";
import authRoutes from "./routes/auth.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
const app = express();

app.use(express.json());
app.use("/api/auth/",authRoutes);
app.use("/api/dashboard/",dashboardRoutes);
connectDB().then(()=>{
    app.listen(ENV.PORT,()=>console.log("Sever is running on port 3000"));
})


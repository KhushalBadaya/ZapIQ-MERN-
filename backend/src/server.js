import express from "express";

const app = express();


app.get("/api/auth/signup",(req,res)=>{
    res.send("SignUp endpoint");
})

app.get("/api/auth/login",(req,res)=>{
    res.send("login endpoint");
})
app.get("/api/auth/logout",(req,res)=>{
    res.send("logout endpoint");
})
app.listen(3000,()=>console.log("Sever is running on port 3000"));

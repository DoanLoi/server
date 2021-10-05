import express from "express";
import userRoute from "./user"

let router=express.Router();


//khoi tao cac route
let initRoutes=(app)=>{
    return app.use("/",userRoute);
}

module.exports=initRoutes;

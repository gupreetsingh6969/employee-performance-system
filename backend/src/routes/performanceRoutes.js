import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
"/",
authMiddleware,
async(req,res)=>{

try{

const {rating,feedback}=req.body;

const review=await prisma.performance.create({

data:{
employeeId:1,
rating:Number(rating),
kpi:"Overall Performance",
review:feedback
}

});

res.json(review);

}catch(error){

console.log("Backend Error:",error);

res.status(500).json({
error:error.message
});

}

}
);


router.get(
"/",
authMiddleware,
async(req,res)=>{

try{

const reviews=await prisma.performance.findMany();

res.json(reviews);

}catch(error){

console.log(error);

res.status(500).json({
error:error.message
});

}

}
);

export default router;
import express from "express";

const router = express.Router();

router.get("/", async(req,res)=>{

const notifications=[

{
id:1,
title:"Performance Review Deadline",
message:"Employee review deadline is tomorrow",
createdAt:new Date()
},

{
id:2,
title:"Feedback Update",
message:"New feedback has been submitted",
createdAt:new Date()
},

{
id:3,
title:"Task Reminder",
message:"Task deadline approaching soon",
createdAt:new Date()
}

];

res.json(notifications);

});

export default router;

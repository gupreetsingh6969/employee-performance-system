import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient();

export const addFeedback=async(req,res)=>{

try{

const{
employeeId,
comment,
rating
}=req.body;

const feedback=
await prisma.feedback.create({

data:{

employeeId:Number(employeeId),
comment,
rating:Number(rating)

}

});

res.status(201).json({

success:true,
data:feedback

});

}
catch(error){

console.log(error);

res.status(500).json({

success:false,
message:error.message

});

}

};



export const getFeedback=async(req,res)=>{

try{

const feedback=

await prisma.feedback.findMany({

include:{
employee:true
},

orderBy:{
createdAt:"desc"
}

});

res.status(200).json({

success:true,
data:feedback

});

}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};

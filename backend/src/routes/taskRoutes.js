import express from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();


// Create Task
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN","HR","MANAGER"),
  async (req,res)=>{

    try{

      const {
        title,
        description,
        employeeId,
        deadline,
        priority
      }=req.body;

      const task=
      await prisma.task.create({

        data:{

          title,
          description,

          employeeId:
          Number(employeeId),

          deadline:
          new Date(deadline),

          priority:
          priority || "Medium",

          status:"Pending"

        }

      });

      res.status(201).json({

        success:true,
        message:"Task assigned successfully",
        data:task

      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({

        success:false,
        message:error.message

      });

    }

  }
);


// Get Tasks

router.get(
  "/",
  authMiddleware,
  async(req,res)=>{

    try{

      const tasks=
      await prisma.task.findMany({

        include:{

          employee:true

        }

      });

      res.status(200).json({

        success:true,
        data:tasks

      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({

        success:false,
        message:error.message

      });

    }

  }
);


// Update task

router.put(
  "/:id",
  authMiddleware,
  async(req,res)=>{

    try{

      const updatedTask=
      await prisma.task.update({

        where:{

          id:Number(req.params.id)

        },

        data:{

          status:req.body.status

        }

      });

      res.status(200).json({

        success:true,
        data:updatedTask

      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({

        success:false,
        message:error.message

      });

    }

  }
);


// Delete task

router.delete(
"/:id",
authMiddleware,
roleMiddleware("ADMIN","HR"),
async(req,res)=>{

try{

await prisma.task.delete({

where:{
id:Number(req.params.id)
}

});

res.json({

success:true,
message:"Task deleted"

});

}

catch(error){

console.log(error);

res.status(500).json({

success:false,
message:error.message

});

}

}
);

export default router;
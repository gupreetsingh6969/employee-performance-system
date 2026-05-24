import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// Get all employees
export const getEmployees = async (req, res) => {
  try {

    const employees =
      await prisma.Employee.findMany();

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// Add employee
export const createEmployee = async (req, res) => {

  try {

    const employee =
      await prisma.Employee.create({
        data: req.body
      });

    res.status(201).json({
      success: true,
      data: employee
    });

  } catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};


// Update employee
export const updateEmployee = async (req,res)=>{

  try{

    const employee=
      await prisma.Employee.update({

        where:{
          id:Number(req.params.id)
        },

        data:req.body

      });

    res.status(200).json({
      success:true,
      data:employee
    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};


// Delete employee
export const deleteEmployee = async(req,res)=>{

  try{

    await prisma.Employee.delete({

      where:{
        id:Number(req.params.id)
      }

    });

    res.status(200).json({
      success:true,
      message:"Employee deleted"
    });

  }catch(error){

    console.log(error);

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};
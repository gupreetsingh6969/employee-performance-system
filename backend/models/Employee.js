import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

department:{
type:String,
required:true
},

position:{
type:String,
required:true
},

performanceScore:{
type:Number,
default:0
},

createdAt:{
type:Date,
default:Date.now
}

});

const Employee = mongoose.model(
"Employee",
employeeSchema
);

export default Employee;
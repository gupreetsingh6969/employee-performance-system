import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({

title:{
type:String,
required:true
},

status:{
type:String,
default:"Pending"
},

employeeId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Employee"
}

});

const Task = mongoose.model(
"Task",
taskSchema
);

export default Task;
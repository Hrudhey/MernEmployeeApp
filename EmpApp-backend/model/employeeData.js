const mongoose= require('mongoose');    // use mongoose to connect to database
const employeeSchema= mongoose.Schema({
    EmployeeID:String,
    Name:String,
    Designation:String,
    Salary:Number,
    Department:String,
    Location:String
    
})
const employeeData= mongoose.model('employeedetail',employeeSchema);   //collection name without s
module.exports= employeeData;
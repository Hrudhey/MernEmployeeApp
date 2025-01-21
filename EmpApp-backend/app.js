const express= require('express');
const morgan= require('morgan');
const app= new express();
const cors= require('cors');
app.use(morgan('dev'));
app.use(cors());
require('dotenv').config();
require('./db/connection');

const userRoutes= require('./routes/userRoutes');
const empRoutes= require('./routes/empRoutes');
app.use('/user',userRoutes);
app.use('/employee',empRoutes);






app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on ${process.env.PORT}`);
})
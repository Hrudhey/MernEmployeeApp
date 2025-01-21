const express= require('express');
const routes= express.Router();
routes.use(express.json());
const userModel= require('../model/userData');
const jwt= require('jsonwebtoken');

routes.post('/login',async(req,res)=>{
    
    const user= await userModel.findOne({Email:req.body.Email})   // first Email is the content in DB
        if(!user){
            res.status(404).send({message:'User not found'});
        }
        try{
          if(user.Password==req.body.Password){
            const payload={Email:user.Email,role: user.role };
            const token= jwt.sign(payload,'empApp');                // token creation and the key
            res.status(200).send({message:'Login Successful',key:token,role: user.role}) // instead of key any variable can be given
          }
          else{
            res.status(400).send({message:'Invalid credentials'})
          }
        }catch (error){
            console.log(error);
        }
    
})

routes.post('/signUp',async (req,res)=>{
    try{
        var item= req.body;
        const data= new userModel(item);           //embedding into the modelname
        await data.save();
        res.status(200).send({message:'user added'})
     //   res.redirect('/');
    } catch (error){
        res.status(404).send('Post Unsuccessful');
    }
  })

  module.exports=routes

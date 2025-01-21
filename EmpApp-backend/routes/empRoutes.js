const express= require('express');
const router= express.Router();
const jwt= require('jsonwebtoken');
router.use(express.json());
const empModel= require('../model/employeeData');


 function verifytoken(req,res,next){
     let token=req.headers.token;            // extract the token from the request
     try {
       if(!token) throw 'Unauthorised access';
       else{
           let payload=jwt.verify(token,'empApp');       // verifying the token using the secret key
           req.user = payload;
           if(!payload) throw 'Unauthorized access';
           next();                                  // we are specifying explicitly that move on to the next request without errors
       }
     } catch (error) {
       console.log(error);
     }
    
    }

    function verifyadmin(req, res, next) {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();  
    }
    

  // Get Operation
router.get('/',verifytoken,async(req,res)=>{
    try{
        const data= await empModel.find();
        res.send(data);
    }catch(error){
        res.status(400).send('Data not found');
    }
})

//Post Operation
router.post('/addemp',verifytoken,verifyadmin,async (req,res)=>{
    try{
        var thing= req.body;
        const data= new empModel(thing);           //embedding into the modelname
        await data.save();
        res.status(200).send({message:'Employee added'})
    
    } catch (error){
        res.status(404).send('Post Unsuccessful');
    }
})

// Put Operation
router.put('/edit/:id',verifytoken,verifyadmin,async(req,res)=>{
    try{
        const data=await empModel.findByIdAndUpdate(req.params.id,req.body);
       res.status(200).send({message:'Updated'});                                      // to update we changed the put into post and then added res.redirect 
    }catch(error){
       res.status(404).send('Update unsuccessful');
    }
})

//Delete Operation
router.delete('/delete/:id',verifytoken,verifyadmin,async(req,res)=>{
    try{
        const data= await empModel.findByIdAndDelete(req.params.id);
        res.status(200).send({message:'Delete Successful'});
    }catch(error){
        res.status(404).send('Delete Unsuccessful');
    }
})



module.exports=router
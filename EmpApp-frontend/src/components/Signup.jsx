import { Button, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const[form,setForm]=useState({
        Name:'',  
        Email:'',
        Password:'',
        role:''
        
        }) 
         const navigate=useNavigate();
    
         function capValue(){
          
         axios.post('https://employee-app-backend-lqd3.onrender.com/user/signUp',form).then((res)=>{
            alert(res.data.message);
            navigate('/');
          
       
           }).catch((error)=>{
            alert('Please SignUp');
          })
        }
  return (
    <div style={{margin:'8%'}}>
         <Typography variant='h3' style={{color:'#faf0ca',fontFamily:'monospace'}}>Signup</Typography>
         <br></br><br></br>
        <Grid container spacing={2}>
  <Grid size={{ xs: 6, md: 6 }}>
    <TextField fullWidth label='Name' variant='outlined' name='Name' onChange={(e)=>{
          setForm({...form,Name:e.target.value})
        }}></TextField>
  </Grid>
  <Grid size={{ xs: 6, md: 6 }}>
  <TextField fullWidth label='Email' variant='outlined' name='Email' onChange={(e)=>{
          setForm({...form,Email:e.target.value})
        }}></TextField>
  </Grid>
  <Grid size={{ xs: 12, md: 12 }}>
  <TextField fullWidth label='Password' variant='outlined' type='password' name='Password' onChange={(e)=>{
          setForm({...form,Password:e.target.value})
        }}></TextField>
  </Grid>
  
 
  <Grid size={{ xs: 12, md: 12 }} > 
  <Button variant='contained' color='warning' onClick={capValue}>Register</Button>
  </Grid>
  <Grid size={{ xs: 12, md: 12 }}>
   <Link to={'/'} style={{textDecoration:'none'}}>Alredy Registered? Login here</Link>
  </Grid>
  </Grid>
  </div>
  )
}

export default Signup

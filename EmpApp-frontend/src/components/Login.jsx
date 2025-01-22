import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const[form,setForm]=useState({
        Email:'',
        Password:'',
        role:''
      }) 

      const [errors, setErrors] = useState({
        Email: '',
        Password: ''
      });
    
      const navigate=useNavigate();          // redirecting or navigating to a different page

      const validateForm = () => {
        const validationErrors = {};
    
        if (!form.Email) {
          validationErrors.Email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.Email)) {
          validationErrors.Email = 'Email is invalid';
        }
    
        if (!form.Password) {
          validationErrors.Password = 'Password is required';
        } else if (form.Password.length < 6) {
          validationErrors.Password = 'Password must be at least 6 characters long';
        }
    
        setErrors(validationErrors);
    
        return Object.keys(validationErrors).length === 0;
      };

      function capValue(){
        if(validateForm()){
       axios.post('https://employee-app-backend-lqd3.onrender.com/user/login',form).then((res)=>{
         alert(res.data.message);
         if(res.data.key){
           sessionStorage.setItem('logintoken',res.data.key);   // to save the data and token
           sessionStorage.setItem('userRole',res.data.role);
           console.log(res.data.role);
           


            if (res.data.role === 'admin') {
              navigate('/employees');  
            } else {
              navigate('/employees');  
            }
           
         }
         else{
           navigate('/');
         }
        
       
    
        }).catch((error)=>{
         alert('Invalid Login');
        })
      }
    }
  return (
    <div className='container1' style={{margin:'10%'}}>
        <Typography variant='h3' style={{color:'white',marginTop:'20px'}}>BlogApp Login</Typography>
        <br></br><br></br>
        <div>
        <TextField label='Email' variant='outlined' name='Email' onChange={(e)=>{
          setForm({...form,Email:e.target.value})                     // (...form) spread operator to concatenate the object
        }} style={{marginLeft:'50px'}}  error={!!errors.Email}
        helperText={errors.email}></TextField>
        </div>
        <br />
        <div>
        <TextField label='password' variant='outlined' name='Password' type='password' onChange={(e)=>{
          setForm({...form,Password:e.target.value})
        }} style={{marginLeft:'50px'}}  error={!!errors.Password}
        helperText={errors.Password}></TextField>
        </div>
        <br />
        <div>
        <TextField label='role' variant='outlined' name='role' onChange={(e)=>{
          setForm({...form,role:e.target.value})
        }} style={{marginLeft:'50px'}}></TextField>
        </div>

        
        <br></br>
        <Button color='secondary' variant='contained' onClick={capValue} style={{marginLeft:'110px'}}>Login</Button> <br />
        <Link to={'/signup'} style={{textDecoration:'none',marginLeft:'55px',color:'white'}}>New user? please Register here</Link>     {/* here the link is there to go to the required page and the path is provided  */}

    </div>
  )
}

export default Login

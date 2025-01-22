import React, { useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Button, TextField } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInterceptor';

const AddEmployee = () => {

    const[form,setForm]=useState({
        EmployeeID:'',
        Name:'',
        Designation:'',
        Salary:'',
        Department:'',
        Location:''
      }) 
      const navigate=useNavigate();
      const location=useLocation();

      function addEmployee(){
        if(location.state!=null){
             axiosInstance.put('https://employee-app-backend-lqd3.onrender.com/employee/edit/'+location.state.val._id,form).then((res)=>{
               alert(res.data.message);
               navigate('/employees')
             })
        }else{
         axiosInstance.post('https://employee-app-backend-lqd3.onrender.com/employee/addemp',form).then((res)=>{
           alert(res.data.message);
           navigate('/employees');
          
       
          }).catch((error)=>{
           alert('Invalid Login');
          })
        }
     }
    useEffect(()=>{
      if (location.state!=null) {                                  // to extract the data passed in the navigate we use a react hook called useLocation
        setForm({...form,EmployeeID:location.state.val.EmployeeID,
          Name:location.state.val.Name,
          Designation:location.state.val.Designation,
          Salary:location.state.val.Salary,
          Department:location.state.val.Department,
          Location:location.state.val.Location
        })
      } else {
        setForm({...form,EmployeeID:'',
          Name:'',
          Designation:'',
          Salary:'',
          Department:'',
          Location:''
      })
    }
   },[])
          
  return (
    <div style={{margin:'8%'}}>
         <Grid container spacing={2}>
  <Grid size={{ xs: 6, md: 6 }}>
    <TextField fullWidth label='Employee ID' variant='outlined' value={form.EmployeeID} name='EmployeeID' onChange={(e)=>{
          setForm({...form,EmployeeID:e.target.value})
  }}></TextField>
  </Grid>
  <Grid size={{ xs: 6, md: 6 }}>
  <TextField fullWidth label='Name' variant='outlined' value={form.Name} name='Name' onChange={(e)=>{
          setForm({...form,Name:e.target.value})
  }}></TextField>
  </Grid>
  <Grid size={{ xs: 6, md: 6 }}>
  <TextField fullWidth label='Designation' variant='outlined' value={form.Designation} name='Designation' onChange={(e)=>{
          setForm({...form,Designation:e.target.value})
  }}></TextField>
  </Grid>
  <Grid size={{ xs: 6, md: 6 }}>
  <TextField fullWidth label='Salary' variant='outlined' value={form.Salary} name='Salary' onChange={(e)=>{
          setForm({...form,Salary:e.target.value})
  }}></TextField>
  </Grid>
  <Grid size={{ xs: 6, md: 6 }}>
  <TextField fullWidth label='Department' variant='outlined' value={form.Department} name='Department' onChange={(e)=>{
          setForm({...form,Department:e.target.value})
  }}></TextField>
  </Grid>
  <Grid size={{ xs: 6, md: 6 }}>
  <TextField fullWidth label='Location' variant='outlined' value={form.Location} name='Location' onChange={(e)=>{
          setForm({...form,Location:e.target.value})
  }}></TextField>
  </Grid>
  </Grid><br></br>
  <Button color='error' variant='contained' onClick={addEmployee}>Add</Button> <br />
  
    </div>
  )
}

export default AddEmployee

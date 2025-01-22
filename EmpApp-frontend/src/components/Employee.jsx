import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosInterceptor.js'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Employee = () => {

  const [tableData,setData]=useState([]);
   const [role, setRole] = useState('');
   const navigate= useNavigate();
   
  
     useEffect(()=>{
      axiosInstance.get('https://employee-app-backend-lqd3.onrender.com/employee/')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error('Error fetching employees:', err);
      });
      const token = sessionStorage.getItem('logintoken');
      const decoded = token ? jwtDecode(token) : null;
      setRole(decoded?.role); 
  }, []);

      
    
         
     
       
       function update_emp(val){
        navigate('/addemployee',{state:{val}})
       }

    function delete_emp(id){
      axiosInstance.delete(`https://employee-app-backend-lqd3.onrender.com/employee/delete/${id}`).then((res) =>{
        alert(res.data.message);
        setData((prevData) =>prevData.filter((employee)=> employee._id !== id));
      }).catch((err)=>{
        console.error(err);
      })
    }

  return (
    <div>
         <h1 style={{fontFamily:'initial',textAlign:'center',marginTop:'2px'}} >Employee List</h1><br/>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}}>EmployeeID</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="right">Name</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="right">Designation</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="right">Salary</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="right">Department</TableCell>
            <TableCell style={{fontWeight:'bold'}} align="right">Location</TableCell>
            {role === 'admin' && (
            <TableCell style={{fontWeight:'bold'}} align="center">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.EmployeeID}
              </TableCell>
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">{row.Designation}</TableCell>
              <TableCell align="right">{row.Salary}</TableCell>
              <TableCell align="right">{row.Department}</TableCell>
              <TableCell align="right">{row.Location}</TableCell>
              {role === 'admin' && (
                <TableCell align="right">
                  <Button size='small' color='secondary' variant='contained' value={row._id} onClick={(()=>{
                    update_emp(row);
                  })}>Edit</Button>&nbsp;
                   <Button size='small' color='secondary' variant='contained' value={row._id} onClick={(()=>{
                    delete_emp(row._id);
                  })}>Delete</Button>
                </TableCell>
                )}
           
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      
   </div>
  )
}

export default Employee

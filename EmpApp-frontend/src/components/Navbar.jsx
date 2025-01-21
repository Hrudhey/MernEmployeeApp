import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();
    const role = sessionStorage.getItem('role'); 

  function handleLogout(){
    // Clear the token
    sessionStorage.removeItem('logintoken');
    sessionStorage.removeItem('role');
    // Redirect to login page
     navigate('/');
     window.location.reload();
   }

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar style={{backgroundColor:'green',marginLeft:'0px',marginBottom:'1px'}}>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WELCOME
        </Typography>
     <Link to={'/employees'}> <Button style={{color:'white'}}>Employee</Button></Link>
     {role === 'admin' && (
              <>
                <Link to="/addemployee">
                  <Button style={{ color: 'white' }}>Add Employee</Button>
                </Link>
              </>
            )}
     <Link to={'/'}> <Button  style={{color:'white'}} onClick={handleLogout} >Logout</Button></Link>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar
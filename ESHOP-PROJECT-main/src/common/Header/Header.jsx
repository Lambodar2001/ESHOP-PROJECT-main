import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './Header.css';
import ToggleBTN from '../../assests/ToggleBTN'

export default function Header(props) {

  const btnstyle = {
    color: '#fff',

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#3f51b5' }}>
        <Toolbar variant="dense">
          {/* Toggle component render here */}
          <div className='btn-toggle'><ToggleBTN /></div>
          <i className="fa-solid fa-cart-shopping"></i>
          <Typography variant="h5" color="inherit" component="div" style={{ padding: "20", marginLeft: '10px' }}>
            ESHOP
          </Typography>
          <div className='btn-header'>
            <Link to="/"><Button color="inherit" className='btn' style={btnstyle} >Home</Button></Link>
            <Link to="/sign-in"><Button color="inherit" className='btn' style={btnstyle}>Login</Button></Link>
            <Link to="/sign-up"><Button color="inherit" className='btn' style={btnstyle}>Register</Button></Link>
            {props.isLogin &&(
               <Button color="inherit" className='btn' style={btnstyle} onClick={props.handleLogOut}>Logout</Button>
            )}
             </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreenButton } from '@fortawesome/free-solid-svg-icons';
import { Nav } from '@mui/material';
import { useState } from 'react';
import Login from './LoginForm'
import Modal from './Modal';
import Image from 'next/image'


export default function ButtonAppBar() {
  const [OpenUser, setOpenUser] = useState(false)

  const handleOpenUser = () => setOpenUser(true);
  const handleCloseUserModal = () => setOpenUser(false);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{background: '#fff'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', color: '#002244', marginLeft: 5, gap: '.3rem', fontWeight:'bold', fontSize: '600'}}>
          <Image src={'/favicon-32x32.png'} height="32" width="32"/>
            Gobill
          </Typography>
          <Button variant='contained' sx={{background: '#002244'}} onClick={handleOpenUser}>Login</Button>
        </Toolbar>
      </AppBar>
      <Modal OpenModal={OpenUser} handleCloseModal={handleCloseUserModal}>
      <Login/>
    </Modal>
    </Box>
  );
}
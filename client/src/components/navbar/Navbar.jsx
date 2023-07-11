import { Avatar, Box, ButtonBase, Stack } from '@mui/material'
import React from 'react'
import logo from '../assets/images/logo.png';
import fireBase from '../../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_OUT } from '../../RTK/Reducers/Reducers';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { currentUser } = useSelector(store => store.mainReducer)

  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await fireBase.auth().signOut();
    dispatch(LOG_OUT())
  }
console.log('currentUser',currentUser);

  return (
    <div>
      <Stack direction='row' alignItems='center' justifyContent={'space-between'} sx={{ minHeight: '86px' }}>
        <NavLink to='/'><Box component='img' src={logo} alt='logo' sx={{ width: '61px', height: '59px' }} /></NavLink>
        <Stack direction='row' alignItems='center' justifyContent={'center'} spacing={1}>
          {currentUser && currentUser?.avatar && <Avatar className="header-Profile-icon" alt={currentUser?.name} src={currentUser?.avatar} />}
          {currentUser && !(currentUser?.avatar) && <Avatar className="header-Profile-icon" >{(currentUser?.name)?.charAt(0).toUpperCase()}</Avatar>}
          {currentUser && <Box sx={{ color: '#FFFFFF' }}>{currentUser?.name}</Box>}
          {currentUser && <ButtonBase sx={style} onClick={handleLogOut} >Log Out</ButtonBase>}
          {!currentUser && <NavLink to='/login'><ButtonBase sx={{ height: '43px', width: '86px', color: '#F1EFFC' }} >Login</ButtonBase></NavLink>}
          {!currentUser && <NavLink to='/sign-up'><ButtonBase sx={style} >Sign Up</ButtonBase></NavLink>}
        </Stack>
      </Stack>
    </div>
  )
}

export default Navbar

const style = { height: '43px', width: '86px', color: '#5E72E4', borderRadius: '7px', backgroundColor: '#FFFFFF', '&:hover': { backgroundColor: '#FFFFFF' } }
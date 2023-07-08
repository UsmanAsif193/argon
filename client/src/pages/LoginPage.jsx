import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import SVGdesign from '../components/SVGdesign';
import { Box, Container } from '@mui/material';
import Signin from '../components/Signin';

const LoginPage = () => {
  return (
    <Box >
      <Container>
        <Navbar />
        <Signin />
        <Footer />
      </Container>
      <SVGdesign />
    </Box>
  )
}

export default LoginPage
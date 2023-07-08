import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import SVGdesign from '../components/SVGdesign';
import { Box, Container } from '@mui/material';
import ForgotPass from '../components/ForgotPass';

const ForgotPasswordPage = () => {
  return (
    <Box >
      <Container>
        <Navbar />
        <ForgotPass />
        <Footer />
      </Container>
      <SVGdesign />
    </Box>
  )
}

export default ForgotPasswordPage
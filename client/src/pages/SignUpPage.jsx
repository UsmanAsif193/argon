import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import SVGdesign from '../components/SVGdesign';
import { Box, Container } from '@mui/material';
import SignUp from '../components/SignUp';

const SignUpPage = () => {
  return (
    <Box >
      <Container>
        <Navbar />
        <SignUp />
        <Footer />
      </Container>
      <SVGdesign />
    </Box>
  )
}

export default SignUpPage
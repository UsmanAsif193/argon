import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import SVGdesign from '../components/SVGdesign';
import { Box, Container } from '@mui/material';
import Reset from '../components/Reset';

const ResetPage = () => {
  return (
    <Box >
      <Container>
        <Navbar />
        <Reset />
        <Footer />
      </Container>
      <SVGdesign />
    </Box>
  )
}

export default ResetPage
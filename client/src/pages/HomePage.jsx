import React from 'react'
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import SVGdesign from '../components/SVGdesign';
import { Box, Container } from '@mui/material';
import HomeButtons from '../components/HomeButtons';

const HomePage = () => {
  return (
    <Box >
      <Container>
        <Navbar />
        <HomeButtons />
        <Footer />
      </Container>
      <SVGdesign />
    </Box>
  )
}

export default HomePage
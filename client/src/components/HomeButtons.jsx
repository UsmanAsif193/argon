import { Box, Grid } from '@mui/material'
import React from 'react'
import cards from './assets/images/cards.png';
import table from './assets/images/table.png';


const HomeButtons = () => {
  return (
    <div>
      <Grid mt='0px' container alignItems={'center'} justifyContent={'center'} spacing={5} textAlign={'center'}>
      <Grid item xs={12}>
          <Box component='img' src={cards} alt='cards' sx={{ width: '100%', maxWidth: '900px',margin:'auto', textAlign: 'center' }} />
        </Grid>
        <Grid item xs={12}>
          <Box component='img' src={table} alt='table' sx={{ width: '100%', maxWidth: '900px',margin:'auto', textAlign: 'center' }} />
        </Grid>
      </Grid>
    </div>
  )
}

export default HomeButtons
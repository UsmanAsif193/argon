import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <div>
      <Stack direction='row' alignItems='center' justifyContent={'space-between'} mt='103px' py={5}>
        <Box>
          © 2023 <span style={{ color: '#5E72E4' }}>Realchat.ai</span>
        </Box>

        <Stack direction='row' alignItems='center' justifyContent={'space-between'} spacing={3}>
          <Typography sx={{ cursor: 'pointer' }}> Realchat.ai</Typography>
          <Typography sx={{ cursor: 'pointer' }}> About Us</Typography>
          <Typography sx={{ cursor: 'pointer' }}> Blog</Typography>
          <Typography sx={{ cursor: 'pointer' }}> License</Typography>
        </Stack>
      </Stack>
    </div>
  )
}

export default Footer
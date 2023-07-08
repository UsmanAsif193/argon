import React from 'react'
import { Box } from '@mui/material'


const SVGdesign = () => {
    return (
        <Box sx={{ position: 'absolute', top: 0, width: '100%', zIndex: -1, overflow:'hidden' }}>
            <div style={{ width: '1920px', height: 'auto' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 470" fill="none" preserveAspectRatio="none">
                    <path d="M0 0H1920V400L0 470V0Z" fill="url(#paint0_linear_116_11091)" />
                    <defs>
                        <linearGradient id="paint0_linear_116_11091" x1="0" y1="235" x2="1920" y2="235" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#5E72E4" />
                            <stop offset="1" stopColor="#825EE4" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

        </Box>
    )
}

export default SVGdesign
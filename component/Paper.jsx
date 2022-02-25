import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Variants({children, elevation}) {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 400,
          minheight: 400,
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          gap: '1rem',
          cursor: 'pointer'
        },
      }}
    >
      <Paper elevation={elevation}>
        {children}
      </Paper>
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Variants({children, elevation, widthComp}) {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: `${widthComp}`,
          minheight: 400,
          marginTop: 1,
          display: 'flex',
          flexDirection: 'row',
          padding: '2rem',
          cursor: 'pointer',
          flexWrap: 'wrap',
          alignItems: 'center',
        },
      }}
    >
      <Paper elevation={elevation}>
        {children}
      </Paper>
    </Box>
  );
}
import React from 'react';
import { Box, Typography } from '@mui/material';
import Ranking from '../atoms/Ranking';

const ActorHeader = ({ name, rating }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: '1rem',
          color: 'rgba(0, 0, 0, 0.87)',
        }}
      >
        @{name.toLowerCase().replace(/\s+/g, '')}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            color: 'rgba(0, 0, 0, 0.87)',
          }}
        >
          {rating}
        </Typography>
        <Typography sx={{ fontSize: '1.2rem' }}>⭐</Typography>
      </Box>
    </Box>
  );
};

export default ActorHeader;

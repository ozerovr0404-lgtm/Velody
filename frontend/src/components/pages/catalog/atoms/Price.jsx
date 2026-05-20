import React from 'react';
import { Typography, Box } from '@mui/material';

const Price = ({ price, currency = '₽' }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: '1.25rem',
          color: 'rgba(8, 94, 75, 1)',
        }}
      >
        {price}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          color: 'text.secondary',
        }}
      >
        {currency}/час
      </Typography>
    </Box>
  );
};

export default Price;

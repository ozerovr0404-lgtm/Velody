// src/components/main/atoms/Subtitle.jsx
import React from 'react';
import { Typography } from '@mui/material';

const Subtitle = () => {
  return (
    <Typography
      variant="subtitle1"
      sx={{
        mt: 2,
        fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
        color: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        margin: '0px 50px'
      }}
    >
      Выбери категорию
    </Typography>
  );
};

export default Subtitle;
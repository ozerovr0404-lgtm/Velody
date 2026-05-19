// src/components/main/atoms/MainImage.jsx
import React from 'react';
import { Box } from '@mui/material';

const MainImage = () => {
  return (
    <Box
      component="img"
      src="/placeholder-hero.png" // позже заменишь на иллюстрацию из макета
      alt="Hero illustration"
      sx={{
        width: '100%',
        maxWidth: { xs: '300px', sm: '500px', md: '600px' },
        height: 'auto',
      }}
    />
  );
};

export default MainImage;
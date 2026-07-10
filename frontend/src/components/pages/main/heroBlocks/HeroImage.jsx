// src/components/main/molecules/HeroImage.jsx
import React from 'react';
import MainImage from '../heroComponents/MainImage';
import { Box } from '@mui/material';

const HeroImage = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, md: 0 } }}>
      <MainImage />
    </Box>
  );
};

export default HeroImage;
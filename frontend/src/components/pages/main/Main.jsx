import React from 'react';
import { Box, Container } from '@mui/material';
import HeroText from './molecules/HeroText';
import HeroImage from './molecules/HeroImage';

const Main = () => {
  return (
    <Box component="main" sx={{ 
      flex: 1,
      py: { xs: 4, md: 2 } 
      }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column' },
          alignItems: 'center',
          padding: '10px',
          gap: 4,
        }}
      >
        <HeroText />
      </Container>
    </Box>
  );
};

export default Main;
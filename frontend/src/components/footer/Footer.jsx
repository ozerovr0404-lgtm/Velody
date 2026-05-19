// src/components/footer/Footer.jsx
import React from 'react';
import { Box, Divider } from '@mui/material';
import Logo from './atoms/Logo';
import FooterLinks from './molecules/FooterLinks';
import SocialIcons from './molecules/SocialIcons';
import CopyRight from './atoms/CopyRight';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        px: { xs: 2, sm: 4 },
        py: 4,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Logo />
        <FooterLinks />
        <SocialIcons />
      </Box>
      <Divider sx={{ mb: 2 }} />
      <CopyRight />
    </Box>
  );
};

export default Footer;
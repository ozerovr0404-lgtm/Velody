// src/components/footer/molecules/SocialIcons.jsx
import React from 'react';
import { Box } from '@mui/material';
import SocialIcon from '../atoms/SocialIcon';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const SocialIcons = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <SocialIcon><FacebookIcon fontSize="small" /></SocialIcon>
      <SocialIcon><TwitterIcon fontSize="small" /></SocialIcon>
      <SocialIcon><InstagramIcon fontSize="small" /></SocialIcon>
    </Box>
  );
};

export default SocialIcons;
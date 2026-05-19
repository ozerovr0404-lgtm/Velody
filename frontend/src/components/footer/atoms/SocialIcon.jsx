import React from 'react';
import { IconButton } from '@mui/material';

const SocialIcon = ({ children }) => {
  return (
    <IconButton
      color="inherit"
      size="small"
      sx={{ p: 0.5 }}
    >
      {children}
    </IconButton>
  );
};

export default SocialIcon;
import React from 'react';
import { Typography } from '@mui/material';

const Logo = () => {
  return (
    <Typography variant="h5" sx={{ fontWeight: 700, alignItems: 'center', display: 'flex' }}>
      <img src="/Frame.svg" alt="Velody" style={{ marginRight: '10px' }} />
      Velody
    </Typography>
  );
};

export default Logo;
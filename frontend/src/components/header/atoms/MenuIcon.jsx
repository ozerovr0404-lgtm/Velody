import React from 'react';
import { IconButton } from '@mui/material';
import Menu from '@mui/icons-material/Menu';

const MenuIcon = () => {
  return (
    <IconButton color="inherit" sx={{ display: { md: 'none' } }}>
      <Menu />
    </IconButton>
  );
};

export default MenuIcon;
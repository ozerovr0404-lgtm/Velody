import React from 'react';
import { Button } from '@mui/material';

const NavButton = ({ label }) => {
  return (
    <Button
      color="inherit"
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '1rem',
        p: 0,
        minWidth: 'auto',
        margin: '0px 10px'
      }}
    >
      {label}
    </Button>
  );
};

export default NavButton;
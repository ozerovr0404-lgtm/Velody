import React from 'react';
import { Button } from '@mui/material';

const FooterButton = ({ label }) => {
  return (
    <Button
      color="inherit"
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.9rem',
        p: 0,
        minWidth: 'auto',
      }}
    >
      {label}
    </Button>
  );
};

export default FooterButton;
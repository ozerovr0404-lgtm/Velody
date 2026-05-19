// src/components/main/atoms/ActionButton.jsx
import React from 'react';
import { Button } from '@mui/material';

const ActionButton = ({ label, variant = 'contained' }) => {
  return (
    <Button
      variant={variant}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        mt: 1,
        color: 'rgba(253, 253, 253, 1)',
        backgroundColor: 'rgba(8, 94, 75, 1)'
      }}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
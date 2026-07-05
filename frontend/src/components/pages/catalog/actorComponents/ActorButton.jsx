import React from 'react';
import { Button } from '@mui/material';

const ActorButton = ({ label = 'Связаться', onClick, variant = 'contained' }) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      fullWidth
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '0.95rem',
        py: 1.2,
        backgroundColor: variant === 'contained' ? 'rgba(8, 94, 75, 1)' : 'transparent',
        color: variant === 'contained' ? 'white' : 'rgba(8, 94, 75, 1)',
        border: variant === 'outlined' ? '1px solid rgba(8, 94, 75, 1)' : 'none',
        borderRadius: '6px',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: variant === 'contained' ? 'rgba(6, 70, 56, 1)' : 'rgba(8, 94, 75, 0.1)',
        },
      }}
    >
      {label}
    </Button>
  );
};

export default ActorButton;

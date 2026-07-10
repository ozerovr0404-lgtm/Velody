// src/components/main/atoms/ActionButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const ActionButton = ({ label, variant = 'contained', navigateTo, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }

    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        mt: 1,
        color: 'rgba(253, 253, 253, 1)',
        backgroundColor: 'rgba(8, 94, 75, 1)',
        '&:hover': {
          backgroundColor: 'rgba(6, 70, 56, 1)',
        }
      }}
    >
      {label}
    </Button>
  );
};

export default ActionButton;
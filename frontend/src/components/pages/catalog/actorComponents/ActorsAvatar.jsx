import React from 'react';
import { Avatar, Box } from '@mui/material';

const ActorsAvatar = ({ src, name, size = 'medium' }) => {
  const sizeMap = {
    small: 40,
    medium: 60,
    large: 80,
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
      <Avatar
        alt={name}
        src={src}
        sx={{
          width: sizeMap[size],
          height: sizeMap[size],
          fontSize: '1.5rem',
          backgroundColor: 'rgba(8, 94, 75, 1)',
        }}
      >
        {name?.charAt(0).toUpperCase()}
      </Avatar>
    </Box>
  );
};

export default ActorsAvatar;

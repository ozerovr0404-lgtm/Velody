import React from 'react';
import { Typography } from '@mui/material';

const ActorDescription = ({ description }) => {
  if (!description) return null;

  return (
    <Typography
      variant="body2"
      sx={{
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '0.85rem',
        lineHeight: 1.5,
        fontStyle: 'italic',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        my: 1,
      }}
    >
      "{description}"
    </Typography>
  );
};

export default ActorDescription;

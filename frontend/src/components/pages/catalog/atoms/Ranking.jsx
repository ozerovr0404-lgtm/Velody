import React from 'react';
import { Box, Rating, Typography } from '@mui/material';

const Ranking = ({ rating = 4.5, reviewCount = 0 }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating
        value={rating}
        readOnly
        precision={0.5}
        size="small"
        sx={{
          color: 'rgba(255, 193, 7, 1)',
        }}
      />
      {reviewCount > 0 && (
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          ({reviewCount})
        </Typography>
      )}
    </Box>
  );
};

export default Ranking;

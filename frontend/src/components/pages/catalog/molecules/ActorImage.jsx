import React from 'react';
import { Box } from '@mui/material';
import LikeChecker from '../atoms/LikeChecker';

const ActorImage = ({ avatar, name, isLiked = false, onToggleLike }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%', // 1:1 aspect ratio
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        backgroundImage: `url(${avatar})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px 12px 0 0',
      }}
    >
      {/* Лайк кнопка в правом углу */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          p: 1,
        }}
      >
        <LikeChecker isLiked={isLiked} onToggleLike={onToggleLike} />
      </Box>
    </Box>
  );
};

export default ActorImage;

import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikeChecker = ({ isLiked = false, onToggleLike }) => {
  const [liked, setLiked] = useState(isLiked);

  const handleLike = () => {
    setLiked(!liked);
    onToggleLike?.(liked);
  };

  return (
    <Tooltip title={liked ? 'Удалить из избранного' : 'Добавить в избранное'}>
      <IconButton
        onClick={handleLike}
        sx={{
          color: liked ? 'rgba(244, 67, 54, 1)' : 'rgba(158, 158, 158, 1)',
          transition: 'color 0.3s ease',
          '&:hover': {
            color: 'rgba(244, 67, 54, 1)',
          },
        }}
      >
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default LikeChecker;

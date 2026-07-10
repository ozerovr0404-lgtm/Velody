import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const LikeChecker = ({ isLiked, onToggleLike }) => {

  return (
    <Tooltip title={isLiked ? 'Удалить из избранного' : 'Добавить в избранное'}>
      <IconButton
        onClick={onToggleLike}
        sx={{
          color: isLiked ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)',
          transition: 'color 0.3s ease',
          '&:hover': {
            color: 'rgba(255, 255, 255, 1)',
          },
        }}
      >
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default LikeChecker;

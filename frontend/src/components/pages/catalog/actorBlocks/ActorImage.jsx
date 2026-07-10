import { Box } from '@mui/material';
import LikeChecker from '../actorComponents/LikeChecker';
import { useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';

const ActorImage = ({ image, isLiked = false, onToggleLike }) => {

  const { user } = useContext(UserContext);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: '100%', // 
        backgroundColor: 'rgba(200, 200, 200, 0.3)',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '12px 12px 0 0',
      }}
    >
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
        {!!user && <LikeChecker isLiked={isLiked} onToggleLike={onToggleLike} />}
      </Box>
    </Box>
  );
};

export default ActorImage;

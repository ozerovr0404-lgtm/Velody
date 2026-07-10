import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import ActorImage from '../actorBlocks/ActorImage';
import ActorHeader from '../actorBlocks/ActorHeader';
import ActorDescription from '../actorBlocks/ActorDescription';
import ActorFooter from '../actorBlocks/ActorFooter';

const ActorCard = ({
  id,
  stage_name,
  avatar_url,
  rating,
  reviews_count,
  price_from,
  description,
  positions,
  genres,
  is_liked = false,
  onToggleLike,
  onOpenProfile
}) => {
  return (
    <Card
      sx={{
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-4px)',
        },
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '360px',
        minWidth: '350px',
        maxHeight: '680px',
        minHeight: '680px',
        margin: '0 auto',
      }}
    >
      <ActorImage
        image={avatar_url}
        isLiked={is_liked}
        onToggleLike={onToggleLike}
      />

      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 2,
        }}
      >
        <ActorHeader 
          name={stage_name} 
          rating={rating} 
          reviewCount={reviews_count} 
        />
        <Typography>
          {positions?.map(p => p.name).join(', ')}
        </Typography>
        <Typography>
          Жанр: {genres?.map(g => g.name).join(', ')}
        </Typography>
        <ActorDescription description={description} />

        <Divider sx={{ my: 1 }} />

        <ActorFooter price={price_from} onClick={onOpenProfile} />
      </CardContent>
    </Card>
  );
};

export default ActorCard;

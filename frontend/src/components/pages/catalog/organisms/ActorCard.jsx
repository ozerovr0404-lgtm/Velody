import { Card, CardContent, Typography, Divider, Box } from '@mui/material';
import ActorImage from '../molecules/ActorImage';
import ActorHeader from '../molecules/ActorHeader';
import ActorDescription from '../molecules/ActorDescription';
import ActorFooter from '../molecules/ActorFooter';

const ActorCard = ({
  id,
  name,
  avatar,
  category,
  rating = 4.5,
  reviewCount = 0,
  price = 2500,
  description,
  isLiked = false,
  onContact,
  onToggleLike,
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
        margin: '0 auto',
      }}
    >
      {/* Фото с лайком */}
      <ActorImage
        avatar={avatar}
        name={name}
        isLiked={isLiked}
        onToggleLike={onToggleLike}
      />

      {/* Основной контент */}
      <CardContent
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          p: 2,
        }}
      >
        {/* Ник и рейтинг */}
        <ActorHeader name={name} rating={rating} reviewCount={reviewCount} />

        {/* Категория */}
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            fontSize: '0.8rem',
          }}
        >
          {category}
        </Typography>

        {/* Описание */}
        <ActorDescription description={description} />

        <Divider sx={{ my: 1 }} />

        {/* Цена и кнопка */}
        <ActorFooter price={price} onContact={() => onContact?.(id)} />
      </CardContent>
    </Card>
  );
};

export default ActorCard;

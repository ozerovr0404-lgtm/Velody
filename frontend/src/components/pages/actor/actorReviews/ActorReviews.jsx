import React, { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Rating,
  Avatar,
  Divider,
} from '@mui/material';

const ActorReviews = ({ actor, reviews, addReview }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);


  return (
    <Box sx={{ mt: 4, minWidth: '600px' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Отзывы ({reviews?.length ?? 0})
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(8,94,75,1)' }}>A</Avatar>
        <Box sx={{ flex: 1 }}>
          <Rating value={rating} onChange={(e, v) => setRating(v || 5)} />
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Место для Вашего комментария..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mt: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button 
              variant="contained" 
              onClick={() => {
                addReview({
                  rating,
                  comment: text
                });
                setText('');
                setRating(5);
              }}
              sx={{
                color: 'white',
                backgroundColor: 'rgba(8, 94, 75, 1)'
              }}
            >
              Отправить
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        {reviews.map((r) => (
          <ListItem key={r.id} alignItems='flex-start' sx={{ mb: 1 }} >
            <Avatar sx={{ mr: 2, bgcolor: 'rgba(8,94,75,1)' }}>
              {r.author_name?.charAt(0).toUpperCase()}
            </Avatar>

            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>
                    {r.author_name}
                  </Typography>

                  <Rating value={r.rating} readOnly size="small" />

                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {new Date(r.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography sx={{ mt: 1 }}>
                  {r.comment}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActorReviews;
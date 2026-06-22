
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

const ActorReviews = ({ actorId }) => {
  const [comments, setComments] = useState([
    { id: 1, user: 'marlonruiz300', rating: 5, text: 'Great work!', date: '20.06.2022' },
  ]);
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const handleAdd = () => {
    if (!text.trim()) return;
    const next = { id: Date.now(), user: 'anon', rating, text, date: new Date().toLocaleDateString() };
    setComments((s) => [next, ...s]);
    setText('');
    setRating(5);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reviews ({comments.length})
      </Typography>

      {/* Comment form */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(8,94,75,1)' }}>A</Avatar>
        <Box sx={{ flex: 1 }}>
          <Rating value={rating} onChange={(e, v) => setRating(v || 5)} />
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Leave a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mt: 1 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button variant="contained" onClick={handleAdd}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <List>
        {comments.map((c) => (
          <ListItem key={c.id} alignItems="flex-start" sx={{ mb: 1 }}>
            <Avatar sx={{ mr: 2, bgcolor: 'rgba(8,94,75,1)' }}>{c.user?.charAt(0).toUpperCase()}</Avatar>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography sx={{ fontWeight: 700 }}>{c.user}</Typography>
                  <Rating value={c.rating} readOnly size="small" />
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {c.date}
                  </Typography>
                </Box>
              }
              secondary={<Typography sx={{ mt: 1 }}>{c.text}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActorReviews;
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const ActorDetailInfo = ({ actor }) => {
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpen = () => setOpenMsg(true);
  const handleClose = () => setOpenMsg(false);
  const handleSend = () => {
    // For now just log the message
    console.log('Send message to actor', actor?.id, message);
    setMessage('');
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Avatar
        src={actor?.avatar}
        alt={actor?.name}
        sx={{ width: 160, height: 160, mb: 1 }}
      />

      <Typography variant="h6">@{actor?.name?.toLowerCase().replace(/\s+/g, '')}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        "{actor?.description}"
      </Typography>

      <Button variant="contained" color="success" onClick={handleOpen} sx={{ width: 160 }}>
        Send message
      </Button>

      <Dialog open={openMsg} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Send message to {actor?.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSend} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ActorDetailInfo;
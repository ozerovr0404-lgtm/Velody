import React, { useState, useRef } from 'react';
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
  IconButton,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ActorDetailInfo = ({ actor, onUpdate }) => {
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    stage_name: actor?.stage_name || '',
    experience_year: actor?.experience_year || '',
    city: actor?.city || '',
    price_from: actor?.price_from || '',
    created_at: actor?.created_at || '',
  });
  const fileRef = useRef();

  const handleOpen = () => setOpenMsg(true);
  const handleClose = () => setOpenMsg(false);
  const handleSend = () => {
    // For now just log the message
    console.log('Send message to actor', actor?.id, message);
    setMessage('');
    handleClose();
  };

  const handleEditToggle = () => setEditing((s) => !s);

  const handleSave = () => {
    onUpdate?.(form);
    setEditing(false);
  };

  const handleFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result;
      onUpdate?.({ avatar: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => fileRef.current?.click();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />

      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={actor?.avatar}
          alt={actor?.stage_name}
          sx={{ width: 160, height: 160 }}
        />
        <Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6">@{actor?.stage_name}</Typography>
            <IconButton size="small" onClick={handleEditToggle}>
              <EditIcon fontSize="small" />
            </IconButton>
            <Button variant="outlined" size="small" onClick={handleFileClick}>
              Загрузить
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            "{actor?.description}"
          </Typography>
        </Box>
      </Stack>

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

      {/* Inline edit area */}
      {editing && (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="stage_name" value={form.stage_name} onChange={(e) => setForm({ ...form, stage_name: e.target.value })} />
          <TextField label="experience_year" value={form.experience_year} onChange={(e) => setForm({ ...form, experience_year: e.target.value })} />
          <TextField label="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <TextField label="price_from" value={form.price_from} onChange={(e) => setForm({ ...form, price_from: e.target.value })} />
          <TextField label="created_at" value={form.created_at} onChange={(e) => setForm({ ...form, created_at: e.target.value })} />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" onClick={handleSave}>Save</Button>
            <Button variant="outlined" onClick={handleEditToggle}>Cancel</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ActorDetailInfo;
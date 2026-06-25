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
    experience_years: actor?.experience_years || '',
    city: actor?.city || '',
    price_from: actor?.price_from || ''
  });
  const fileRef = useRef();

  console.log("actor avatar:", actor?.avatar_url);

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
      onUpdate?.({ avatar_url: base64 });
    };
    reader.readAsDataURL(file);
  };

  const handleFileClick = () => fileRef.current?.click();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />

      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={actor?.avatar_url}
          alt={actor?.stage_name}
          sx={{ width: 160, height: 160 }}
        >
          {actor?.stage_name?.[0]}
        </Avatar>
        <Box
          sx={{
            width: '500px'
          }}
        >
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h6">@{actor?.stage_name}</Typography>
            <IconButton size="small" onClick={handleEditToggle}>
              <EditIcon fontSize="small" />
            </IconButton>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleFileClick}
              sx={{
              color: 'rgba(8, 94, 75, 1)',
              border: '1px solid rgba(8, 94, 75, 1)'
            }}
            >
              Загрузить
            </Button>
            
          </Stack>
            
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            "{actor?.description}"
          </Typography>
        </Box>
      </Stack>

      <Dialog open={openMsg} onClose={handleClose} fullWidth maxWidth="sm" disableScrollLock>
        <DialogTitle>Написать сообщение {actor?.name}</DialogTitle>
        <DialogContent sx={{ pb: 0}}>
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
          <Button 
            onClick={handleClose}
            sx={{
              color: 'rgba(8, 94, 75, 1)',
              border: '1px solid rgba(8, 94, 75, 1)'
            }}
          >
            Отмена</Button>
          <Button 
            onClick={handleSend} 
            variant="contained"
            sx={{
            color: 'white',
            backgroundColor: 'rgba(8, 94, 75, 1)',
            mr: 2
          }}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>

      {/* Inline edit area */}
      {editing && (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Сценическое имя" value={form.stage_name} onChange={(e) => setForm({ ...form, stage_name: e.target.value })} />
          <TextField 
            label="Опыт" 
            value={form.experience_years} 
            onChange={(e) => 
              setForm({ 
                ...form, 
                experience_years: e.target.value })} 
          />
          <TextField 
            label="Город" 
            value={form.city} 
            onChange={(e) => setForm({ ...form, city: e.target.value })} 
          />
          <TextField 
            label="Цена от" 
            value={form.price_from} 
            onChange={(e) => setForm({ ...form, price_from: e.target.value })} 
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="contained" 
              onClick={handleSave}
              sx={{
              color: 'white',
              backgroundColor: 'rgba(8, 94, 75, 1)'
            }}
            >
              Сохранить
            </Button>
            <Button 
             variant="outlined" 
             onClick={handleEditToggle}
             sx={{
              color: 'rgba(8, 94, 75, 1)',
              border: '1px solid rgba(8, 94, 75, 1)'
            }}
            >
              Отменить
            </Button>
          </Box>
        </Box>
      )}
      <Button 
        variant="outlined" 
        size="normal" 
        onClick={handleOpen}
        sx={{
          width: '160px',
          height: '40px',
          color: 'white',
          backgroundColor: 'rgba(8, 94, 75, 1)'
        }}
      >
        Связаться
      </Button>
    </Box>
  );
};

export default ActorDetailInfo;
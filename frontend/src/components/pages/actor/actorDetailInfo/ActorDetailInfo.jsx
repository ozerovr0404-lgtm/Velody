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
  Checkbox,
  FormControl,
  InputLabel,
  Autocomplete
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ActorDetailInfo = ({ actor, onUpdate }) => {
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    stage_name: actor?.stage_name || '',
    experience_years: actor?.experience_years || '',
    city: actor?.city || '',
    price_from: actor?.price_from || '',
    description: actor?.description || '',
    artist_position: actor?.artist_position || '',
    genre: actor?.genres || []
  });
  const fileRef = useRef();

  const genresList = [
    "Рок", "Метал", "Поп", "Джаз", "Блюз", "Классическая",
    "Хип-Хоп", "Электронная", "Фолк", "Кантри", "Регги",
    "R&B", "Соул", "Фанк", "Инди", "Панк",
    "Альтернативная", "Эмбиент", "Латина", "Иное"
  ];

  const artistPositionList = [
    "Гитара", "Фортепиано", "Ударные", "Вокал", "Оператор", "Звукорежиссер"
  ];

  console.log("actor avatar:", actor?.avatar_url);

  const handleOpen = () => setOpenMsg(true);
  const handleClose = () => setOpenMsg(false);
  const handleSend = () => {
    console.log('Send message to actor', actor?.id, message);
    setMessage('');
    handleClose();
  };

  const hadleEditOpen = () => {
    setForm({
      stage_name: actor?.stage_name || '',
      experience_years: actor?.experience_years || '',
      city: actor?.city || '',
      price_from: actor?.price_from || '',
      description: actor?.description || '',
      artist_position: actor?.artist_position || '',
      genre: actor?.genres || ''
    });

    setEditOpen(true);
  }

  const handleEditToggle = () => setEditing((s) => !s);

  const handleEditClose = () => {
    onUpdate?.(form);
    setEditOpen(false);
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => handleFile(e.target.files?.[0])} />

      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={actor?.avatar_url}
          alt={actor?.stage_name}
          sx={{ width: 250, height: 300, borderRadius: 2 }}
        >
          {actor?.stage_name?.[0]}
        </Avatar>
        <Box
          sx={{
            width: '500px'
          }}
        >
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography 
              variant="h6"
              sx={{
                fontSize: 35
              }}
            >
              @{actor?.stage_name}
            </Typography>
            <IconButton size="small" onClick={hadleEditOpen}>
              <EditIcon fontSize="small" />
            </IconButton>
            
          </Stack>
            
                    <>
                      <Typography
                        sx={{
                          fontSize: 20
                        }}
                      >
                        Специализация: {actor?.artist_position?.join(", ") || 'Не указана'}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 20
                        }}
                      >
                        Жанр: {actor?.genres?.join(", ") || 'Не указан'}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 20
                        }}
                      >
                        Опыт: {actor?.experience_years} лет
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 20
                        }}
                      >
                        Город: {actor?.city}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 20
                        }}
                      >
                        Стоимость услуг от:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 30
                        }}
                      >
                        ${actor?.price_from}
                      </Typography>
                    </>
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
            placeholder="Музыкант ждёт Вашего сообщения..."
          />
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleClose}
            sx={{
              color: 'rgba(8, 94, 75, 1)',
              border: '1px solid rgba(8, 94, 75, 1)',
              mt: 1,
              mb: 1
            }}
          >
            Отмена</Button>
          <Button 
            onClick={handleSend} 
            variant="contained"
            sx={{
            color: 'white',
            backgroundColor: 'rgba(8, 94, 75, 1)',
            mr: 2,
            mt: 1,
            mb: 1
          }}
          >
            Отправить
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editOpen}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Редактирование профиля</DialogTitle>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField
            label="Сценическое имя"
            value={form.stage_name}
            onChange={(e) => setForm({ ...form, stage_name: e.target.value })}
            sx={{
              mt: 1
            }}
          />

          <Autocomplete
              multiple
              options={artistPositionList}
              value={form.artistPositionList || []}
              onChange={(event, newValue) =>
                setForm({ ...form, artistPositionList: newValue })
              }
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Специализация"
                />
              )}
            />

          <FormControl fullWidth>
          <InputLabel
            id="genre-label"
          />

            <Autocomplete
              multiple
              options={genresList}
              value={form.genres || []}
              onChange={(event, newValue) =>
                setForm({ ...form, genres: newValue })
              }
              disableCloseOnSelect
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Жанр"
                />
              )}
            />
          </FormControl>

          <TextField
            label="Опыт"
            value={form.experience_years}
            onChange={(e) =>
              setForm({ ...form, experience_years: e.target.value })
            }
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

          <TextField
            label="О себе"
            multiline
            minRows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button 
            onClick={handleEditClose}
            sx={{
              mb: 1,
              color: 'rgba(8, 94, 75, 1)',
              border: '1px solid rgba(8, 94, 75, 1)',
            }}
          >
            Отмена
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              onUpdate?.(form);
              handleEditClose();
            }}
            sx={{
              mr: 2,
              mb: 1,
              color: 'white',
              backgroundColor: 'rgba(8, 94, 75, 1)'
            }}
          >
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>

      <Button 
        variant="outlined" 
        size="normal" 
        onClick={handleOpen}
        sx={{
          width: '250px',
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
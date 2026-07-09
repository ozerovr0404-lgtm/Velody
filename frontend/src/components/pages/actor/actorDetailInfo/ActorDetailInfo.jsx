import React, { useState, useRef, useEffect } from 'react';
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
  Autocomplete,
  Switch,
  FormControlLabel,
  Rating
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from 'react';
import { UserContext } from '../../../../context/UserContext';
import sendMessage from '../../../../services/email/sendMessage';

const ActorDetailInfo = ({ actor, onUpdate }) => {

  const { user, openLogin } = useContext(UserContext);
  const [openMsg, setOpenMsg] = useState(false);
  const [message, setMessage] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [form, setForm] = useState({
    stage_name: actor?.stage_name ?? '',
    experience_years: actor?.experience_years ?? '',
    city: actor?.city ?? '',
    price_from: actor?.price_from ?? '',
    description: actor?.description ?? '',
    genres: actor.genres ?? [],
    artist_position: actor.artist_profile ?? [],
    is_published: actor?.is_published ?? false
  });
  const fileRef = useRef();

  const [artistPositionOptions, setArtistPositionOptions] = useState([]);
  const [genresOptions, setGenresOptions] = useState([]);

  const handleOpen = () => setOpenMsg(true);
  const handleClose = () => setOpenMsg(false);

  const handleSend = async () => {

    if (!message.trim()) {
      return;
    }

    try {
      await sendMessage({
        recipientId: actor.id,
        message
      });
      
      setMessage('');
      handleClose();
    } catch (err) {
      console.error('Ошибка отправки сообщения!', err);
    }
  };

  useEffect(() => {
    const load = async () => {
      const resArtistPosition = await fetch('http://localhost:3000/artist-positions');
      const resGenres = await fetch('http://localhost:3000/genres');
      const data1 = await resArtistPosition.json();
      const data2 = await resGenres.json();
      setArtistPositionOptions(data1.positions);
      setGenresOptions(data2.genres);
    };

    load();
  }, []);


  useEffect(() => {
    
  if (!actor) return;

  setForm({
      stage_name: actor.stage_name ?? '',
      experience_years: actor.experience_years ?? '',
      city: actor.city ?? '',
      price_from: actor.price_from ?? '',
      description: actor.description ?? '',

      genres: actor.genres ?? [],
      artist_position: actor.artist_position ?? [],

      is_published: actor?.is_published ?? false
    });
  }, [actor, editOpen]);


  const hadleEditOpen = () => {
    setForm({
      stage_name: actor?.stage_name || '',
      experience_years: actor?.experience_years || '',
      city: actor?.city || '',
      price_from: actor?.price_from || '',
      description: actor?.description || '',

      genres: actor.genres,
      artist_position: actor.artist_position
    });

    setEditOpen(true);
  }


  const handleEditClose = () => {
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

      <Stack direction="row" spacing={2}>
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
          
          <Stack direction="row" spacing={1}>

          <Box>
            <Typography 
              variant="h6"
              sx={{
                fontSize: 35
              }}
            >
              @{actor?.stage_name}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <Typography
                sx={{
                  fontSize: '22px',
                  fontWeight: '500',
                  mr: 1
                }}
              >
                {actor?.rating}
              </Typography>
              <Rating value={actor?.rating} readOnly sx={{ mt: '4px' }} />
            </Box>
          </Box>

            {user?.profileId === actor.id && 
                <IconButton size="small" onClick={hadleEditOpen}>
                  <EditIcon fontSize="small" />
                </IconButton>
            }
          </Stack>
            
            <>
              <Typography
                sx={{
                  fontSize: 20
                }}
              >
                Специализация: {actor?.artist_position?.map(a => a.name).join(", ") || 'Не указана'}
              </Typography>
              <Typography
                sx={{
                  fontSize: 20
                }}
              >
                Жанр: {actor?.genres?.map(g => g.name).join(", ") || 'Не указан'}
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
                ₽{actor?.price_from}
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
    
        <FormControl fullWidth>
          <InputLabel
            id="artistPosition-label"
          />

          <Autocomplete
            multiple
            options={artistPositionOptions}

            value={form.artist_position}

            onChange={(event, newValue) =>
              setForm({
                ...form,
                artist_position: newValue
              })
            }

            disableCloseOnSelect
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}

            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox checked={selected} style={{ marginRight: 8 }} />
                {option.name}
              </li>
            )}

            renderInput={(params) => (
              <TextField {...params} placeholder="Специализация" />
            )}
          />

          </FormControl>

          <FormControl fullWidth>
          <InputLabel
            id="genre-label"
          />
          
            <Autocomplete
              multiple
              options={genresOptions}
              value={form.genres}
              onChange={(event, newValue) => {
                setForm({ 
                  ...form, 
                  genres: newValue 
                })
              }
                
              }
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.name}
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

          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={form.is_published}
                  onChange={(e) => setForm({...form, is_published: e.target.checked})}
                  label={"Опубликовать профиль"}
                />
              }
              label={"Опубликовать профиль"}
            />
            
          </FormControl>

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
            onClick={async () => {
              await onUpdate?.({
                ...form
              });
              document.activeElement?.blur();
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

            {/* После подключения CDN сюда добавить условие - если user && */}


      {user?.profileId === actor.id ? <Button 
          variant="outlined" 
          size="normal" 
          onClick={handleFile}
          sx={{
            width: '250px',
            height: '40px',
            color: 'white',
            backgroundColor: 'rgba(8, 94, 75, 1)'
          }}
        >
          Загрузить фото
        </Button> : 
        user ? <Button 
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
        </Button> : <Button 
          variant="outlined" 
          size="normal" 
          onClick={openLogin}
          sx={{
            width: '250px',
            height: '40px',
            color: 'white',
            backgroundColor: 'rgba(8, 94, 75, 1)'
          }}
        >
          Ожидается авторизация
        </Button>}
    </Box>
  );
};

export default ActorDetailInfo;
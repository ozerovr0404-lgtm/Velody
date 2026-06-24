import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Stack } from '@mui/material';

const ActorInfo = ({ actor, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    description: actor.description || '',
    stage_name: actor.stage_name || '',
    city: actor.city || '',
    experience_years: actor.experience_years || '',
    price_from: actor.price_from || ''
  });

  useEffect(() => {
    if (actor) {
      setForm({
        description: actor?.description || '',
        stage_name: actor.stage_name || '',
        city: actor.city || '',
        experience_years: actor.experience_years || '',
        price_from: actor.price_from || ''
      });
    }
  }, [actor]);

  const handleChange = (e, v) => setTab(v);
  const handleSave = () => {
    onUpdate?.(form);
    setEditing(false);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        @{actor?.stage_name}
      </Typography>

      <Tabs 
        onChange={handleChange} 
        aria-label="directions tabs"
        sx={{
          '& .MuiTabs-indicator': {
              backgroundColor: '#085E4B',
          }
        }}
        >
        <Tab 
          label="Направление"
          sx={{
            color: '#999',
            '&.Mui-selected': {
              color: '#085E4B',
            }
          }}
        />  // переделать на мультиселект с запросом в БД
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {!editing ? (
          <>
            <Typography variant="body1">{actor?.description}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
              Опыт: {actor?.experience_years} лет • Город: {actor?.city}
            </Typography>
            <Button 
              sx={{ 
                mt: 1,
                color: 'rgba(8, 94, 75, 1)',
                border: '1px solid rgba(8, 94, 75, 1)',
              }} 
              size="small" 
              onClick={() => setEditing(true)}
            >
              Редактировать
            </Button>
          </>
        ) : (
          <Stack spacing={1}>
            <TextField label="Описание" multiline minRows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
                onClick={() => setEditing(false)}
                sx={{
                  color: 'rgba(8, 94, 75, 1)',
                  border: '1px solid rgba(8, 94, 75, 1)'
                }}
              >
                Отмена
              </Button>
            </Box>
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default ActorInfo;


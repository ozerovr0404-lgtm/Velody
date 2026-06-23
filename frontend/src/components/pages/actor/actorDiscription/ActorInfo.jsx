import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, TextField, Button, Stack } from '@mui/material';

const ActorInfo = ({ actor, onUpdate }) => {
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    secondary_name: actor?.secondary_name || '',
    description: actor?.description || '',
  });

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
        value={tab} 
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
              Опыт: {actor?.experience_year} лет • Город: {actor?.city}
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Доп. имя: {actor?.secondary_name}
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
            <TextField label="Сценическое имя" value={form.secondary_name} onChange={(e) => setForm({ ...form, secondary_name: e.target.value })} />
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


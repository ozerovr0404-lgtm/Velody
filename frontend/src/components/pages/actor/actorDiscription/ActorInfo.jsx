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
        price_from: actor.price_from || '',
        artist_position: actor?.artist_position || '',
        genre: actor?.genre || ''
      });
    }
  }, [actor]);

  const handleSave = () => {
    onUpdate?.(form);
    setEditing(false);
  };

  return (
    <Box 
      sx={{width: '765px' }}
    >

      <Box sx={{ mt: 2 }}>
        {!editing ? (
          <Typography variant="body2" sx={{ fontSize: 20 , mt: 1 }}>
            "{actor?.description}"
          </Typography>
        ) : (
          <Stack spacing={1}>
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


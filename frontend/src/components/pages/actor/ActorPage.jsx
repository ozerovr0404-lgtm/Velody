import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import ActorDetailInfo from './actorDetailInfo/ActorDetailInfo';
import ActorInfo from './actorDiscription/ActorInfo';
import ActorReviews from './actorReviews/ActorReviews';
import updateUserProfile from '../../../services/updateProfile/updateUserProfile';
import getUserProfileForId from '../../../services/getProfile/getUserProfileForId';

const ActorPage = () => {
  const { id } = useParams();
  console.log('ID TYPE:', typeof id, id);

  const [actor, setActor] = useState(null);

    useEffect(() => {
      if (!id) return;

      let active = true;

      const load = async () => {
        const data = await getUserProfileForId(id);
        if (active) setActor(data);
      };

      load();
    
      return () => {
        active = false;
      };
    }, [id]);

  


  const handleUpdate = async(payload) => {
    try {
      if (!actor.id) return;

      const cleanPayload = {
        ...payload,
        artist_position: payload.artist_position.map(p => p.id),
        genres: payload.genres.map(g => g.id)
      };

      console.log('Clean Payload:', cleanPayload);

      const updated = await updateUserProfile(id, cleanPayload);

      setActor(updated);

    } catch (err) {
      console.error('Ошибка обновления профиля', err);
    }
  }

  
  if (!actor && id) {
    return <div>Загрузка...</div>;
  }
  

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="md" sx={{ py: 6, ml: 35 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <ActorDetailInfo 
              actor={actor} 
              onUpdate={handleUpdate} />
          </Grid>

          <Grid item xs={12} md={8}>

            <ActorInfo 
              actor={actor} 
              onUpdate={handleUpdate} />

            <ActorReviews actorId={actor.id} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ActorPage;
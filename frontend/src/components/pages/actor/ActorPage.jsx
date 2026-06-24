import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import ActorDetailInfo from './actorDetailInfo/ActorDetailInfo';
import ActorInfo from './actorDiscription/ActorInfo';
import ActorReviews from './actorReviews/ActorReviews';
import updateUserProfile from '../../../services/updateProfile/updateUserProfile';
import getUserProfile from '../../../services/getProfile/getUserProfile';

const ActorPage = () => {
  const { id } = useParams();

  const [actor, setActor] = useState(null);

    useEffect(() => {
      console.log('useEffect fired', id)
      if (!id) return;

      const loadUser = async () => {
        try {
          const data = await getUserProfile(id);
          setActor(data.user);
        } catch (error) {
          console.error('Ошибка загрузки профиля', error);
        }
      };

    loadUser();
  }, [id]);

  const handleUpdate = async(payload) => {
    try {
      if (!actor.id) return;

      await updateUserProfile(id, payload)

      setActor((prev) => ({ 
        ...prev, 
        ...payload 
      }));
    } catch (err) {
      console.error('Ошибка обновления профиля', err);
    }
  }

  if (!actor) {
    return <div>Загрузка...</div>;
  }
  

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
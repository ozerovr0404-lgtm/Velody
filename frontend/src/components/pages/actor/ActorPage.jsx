import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import ActorDetailInfo from './actorDetailInfo/ActorDetailInfo';
import ActorInfo from './actorDiscription/ActorInfo';
import ActorReviews from './actorReviews/ActorReviews';
import updateUserProfile from '../../../services/updateProfile/updateUserProfile';
import getUserProfileForId from '../../../services/getProfile/getUserProfileForId';
import getReviewsByProfileId from '../../../services/artistFeedback/getReviewsByProfileId';
import addReviewByProfileId from '../../../services/artistFeedback/addReviewByProfileId';


const ActorPage = () => {
  const { id } = useParams();

  const [actor, setActor] = useState(null);
  const [reviews, setReviews] = useState([]);

    useEffect(() => {
      if (!id) return;

      setActor(null);
      setReviews([]);

      let active = true;

      const load = async () => {
        const data = await getUserProfileForId(id);
        if (active) setActor(data);

        const reviews = await getReviewsByProfileId(id);

        if (reviews) setReviews(reviews);
      };

      load();
    
      return () => {
        active = false;
      };
    }, [id]);

    
    useEffect(() => {
      window.scroll(0, 0);
    }, []);


  const handleUpdate = async(payload) => {
    try {
      if (!actor.id) return;

      const cleanPayload = {
        ...payload,
        artist_position: payload.artist_position.map(p => p.id),
        genres: payload.genres.map(g => g.id)
      };

      const updated = await updateUserProfile(id, cleanPayload);

      setActor(updated);

    } catch (err) {
      console.error('Ошибка обновления профиля', err);
    }
  }


  const handleAddReview = async ({ rating, comment }) => {
    try {
      const result = await addReviewByProfileId(id, {
        rating,
        comment
      });

      const updateReviews = await getReviewsByProfileId(id);
      setReviews(updateReviews.reviews ?? updateReviews);

      setActor(prev => ({
        ...prev,
        rating: result.rating,
        reviews_count: result.reviews_count
      }));

    } catch (err) {
      console.error(err);
    }
  }
  
  if (!actor && id) {
    return <div>Загрузка...</div>;
  }
  

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="md" sx={{ py: 6, ml: 35 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 10.8 }}>
            <ActorDetailInfo 
              actor={actor} 
              onUpdate={handleUpdate} />
          </Grid>

          <Grid size={{ xs: 12, md: 10.8 }}>

            <ActorInfo 
              actor={actor} 
              onUpdate={handleUpdate} />

            <ActorReviews actor={actor} reviews={reviews} addReview={handleAddReview} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ActorPage;
import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import ActorDetailInfo from './actorDetailInfo/ActorDetailInfo';
import ActorInfo from './actorDiscription/ActorInfo';
import ActorReviews from './actorReviews/ActorReviews';

const ActorPage = () => {
  // actor state lifted here so child components can update
  const [actor, setActor] = useState({
    id: 1,
    stage_name: 'Nick Portman',
    secondary_name: 'nickportman',
    avatar: '/avatar-placeholder.jpg',
    category: 'Гитарист',
    rating: 5.0,
    reviewCount: 100,
    price_from: 10,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    experience_year: 5,
    city: 'Moscow',
    created_at: '2022-01-01',
  });

  const handleUpdate = (patch) => {
    setActor((prev) => ({ ...prev, ...patch }));
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <ActorDetailInfo actor={actor} onUpdate={handleUpdate} />
          </Grid>

          <Grid item xs={12} md={8}>
            <ActorInfo actor={actor} onUpdate={handleUpdate} />

            <ActorReviews actorId={actor.id} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ActorPage;
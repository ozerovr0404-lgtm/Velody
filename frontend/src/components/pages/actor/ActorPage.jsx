import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import ActorDetailInfo from './actorDetailInfo/ActorDetailInfo';
import ActorInfo from './actorDiscription/ActorInfo';
import ActorReviews from './actorReviews/ActorReviews';
import CatalogPage from '../catalog/CatalogPage';

const ActorPage = () => {
  const actor = {
    id: 1,
    name: 'Nick Portman',
    avatar: '/avatar-placeholder.jpg',
    category: 'Гитарист',
    rating: 5.0,
    reviewCount: 100,
    price: 10,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <ActorDetailInfo actor={actor} />
        </Grid>

        <Grid item xs={12} md={8}>
          <ActorInfo actor={actor} />

          <ActorReviews actorId={actor.id} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActorPage;
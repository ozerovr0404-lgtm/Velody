import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import { Box, Container, Grid } from '@mui/material';
import ActorCard from './organisms/ActorCard';
import CategoryTab from '../../shared/tabs/CategoryTab';
import getPublishedProfile from '../../../services/getProfile/getPublishedProfile';

const CatalogPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    const loadCard = async () => {
      try {
        const data = await getPublishedProfile();
        setActors(data);
      } catch (err) {
        console.error('Ошибка загрузки публикаций!', err);
      }
    }

    loadCard();
  }, []);

  const handleContact = (id) => {
    console.log(`Contact requested for actor ${id}`);
  };

  const handleToggleLike = (id, isLiked) => {
    console.log(`Actor ${id} liked: ${isLiked}`);
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/your-background-image.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => {
            console.log(newValue);
            setTabValue(newValue);
          }}
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none',
            },
          }}
        >
          <CategoryTab
            value={0} 
            label="Гитара" 
          />
          <CategoryTab
            value={1} 
            label="Фортепиано" 
          />
          <CategoryTab
            value={2} 
            label="Ударные" 
          />
          <CategoryTab
            value={3} 
            label="Вокал" 
          />
          <CategoryTab
            value={4} 
            label="Оператор" 
          />
          <CategoryTab
            value={5} 
            label="Звукорежиссер" 
          />
        </Tabs>
      </Box>

      <Box sx={{ flex: 1, py: { xs: 4, md: 4 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3} sx={{ justifyContent: 'flex-start' }}>
            {actors.map((actor) => (
              <Grid item xs={12} sm={6} md={3} lg={3} key={actor.id}>
                <ActorCard
                  {...actor}
                  onContact={handleContact}
                  onToggleLike={(isLiked) => handleToggleLike(actor.id, isLiked)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CatalogPage;

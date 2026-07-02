import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import ActorCard from './organisms/ActorCard';
import CategoryTab from '../../shared/tabs/CategoryTab';
import getPublishedProfile from '../../../services/getProfile/getPublishedProfile';

const CatalogPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [actors, setActors] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const navigate = useNavigate();
  

  useEffect(() => {
    const loadCard = async () => {
      try {
        const res = await getPublishedProfile(page, limit);
        setActors(res.data.profile);
        setTotalItems(res.data.totalItems);
      } catch (err) {
        console.error('Ошибка загрузки публикаций!', err);
      }
    }

    loadCard();
  }, [page]);


  
  const clickProfile = (id) => {
    if (clickProfile) {
      navigate(`/actor/profile/${id}`);
    }
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
          <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
            {actors.map((actor) => (
              <Grid size={{xs: 12, sm: 6, md: 3, lg: 4}}  key={actor.id}>
                <ActorCard
                  {...actor}
                  onOpenProfile={() => clickProfile(actor.id)}
                  onToggleLike={(isLiked) => handleToggleLike(actor.id, isLiked)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Stack
          sx={{
            mt: 4,
            width: "100%",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Pagination 
            count={Math.ceil(totalItems / limit)}
            page={page}
            onChange={(_, value) => setPage(value)}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default CatalogPage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import ActorCard from './actorCard/ActorCard';
import CategoryTab from '../../shared/tabs/CategoryTab';
import getPublishedProfile from '../../../services/getProfile/getPublishedProfile';
import CatalogFilter from '../../shared/filter/filterPanel';
import PremiumPanel from '../../shared/premiumPanel/PremiumPanel';

const CatalogPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [filtersDraft , setFiltersDraft ] = useState({
    ratingFrom: 0,
    ratingTo: 5,
    genres: [],
    experienceFrom: "",
    experienceTo: "",
    priceFrom: "",
    priceTo: "",
    likeOnly: false
  });
  const [filtersApplied, setFiltersApplied] = useState(filtersDraft);
  const [actors, setActors] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const navigate = useNavigate();
  

  useEffect(() => {
    const loadCard = async () => {
      try {
        const res = await getPublishedProfile(page, limit, {
          ...filtersApplied,
          tab: tabValue
        });

        setActors(res.data.profile);
        setTotalItems(res.data.totalItems);
      } catch (err) {
        console.error('Ошибка загрузки публикаций!', err);
      }
    };

    loadCard();
  }, [page, filtersApplied, tabValue]);


  useEffect(() => {
    setPage(1);
  }, [filtersApplied, tabValue]);

  
  const clickProfile = (id) => {
    if (id) {
      navigate(`/profile/${id}`);
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
      <Box sx={{ flex: 1, py: 4 }}>
        <Container maxWidth={false}>
          <Grid container spacing={3}>

            {/* Левая панель */}
            <Grid size={{ md: 2 }}>
              <CatalogFilter
                filters={filtersDraft}
                onChange={setFiltersDraft}
                onApply={() => setFiltersApplied(filtersDraft)}
              />
            </Grid>

            {/* Центр */}
            <Grid size={{ md: 8 }}>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'center' }}
              >
                {actors.map((actor) => (
                  <Grid
                    key={actor.id}
                    size={{ xs: 12, sm: 6, lg: 4 }}
                  >
                    <ActorCard
                      {...actor}
                      onOpenProfile={() => clickProfile(actor.id)}
                      onToggleLike={(isLiked) =>
                        handleToggleLike(actor.id, isLiked)
                      }
                    />
                  </Grid>
                ))}
              </Grid>

              <Stack
                sx={{
                  mt: 4,
                  alignItems: 'center'
                }}
              >
                <Pagination
                  count={Math.ceil(totalItems / limit)}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                />
              </Stack>
            </Grid>

            {/* Правая панель */}
            <Grid size={{ md: 2 }}>
              <PremiumPanel />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CatalogPage;

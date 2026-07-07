import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Container, Grid, Pagination, Stack } from '@mui/material';
import ActorCard from './actorCard/ActorCard';
import CategoryTab from '../../shared/tabs/CategoryTab';
import getPublishedProfile from '../../../services/getProfile/getPublishedProfile';
import CatalogFilter from '../../shared/filter/filterPanel';
import PremiumPanel from '../../shared/premiumPanel/PremiumPanel';
import toggleFavorite from '../../../services/catalogServices/toggleFavorite';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';

const CatalogPage = () => {
  const { user } = useContext(UserContext);
  const [tabValue, setTabValue] = useState(false);
  const getDefualtFilter = () => ({
    ratingFrom: 0,
    ratingTo: 5,
    genres: [],
    experienceFrom: "",
    experienceTo: "",
    priceFrom: "",
    priceTo: "",
    likeOnly: false
  });
  const [filtersDraft , setFiltersDraft ] = useState(getDefualtFilter());
  const [filtersApplied, setFiltersApplied] = useState(getDefualtFilter());
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
  }, [page, filtersApplied, tabValue, user]);

  useEffect(() => {
    setPage(1);
  }, [user]);

  const handleTabChange = (event, value) => {
    setTabValue(value);
    setPage(1);
  };

  const handleApply = () => {
    setFiltersApplied(filtersDraft);
    setPage(1);
  }

  
  const clickProfile = (id) => {
    if (id) {
      navigate(`/profile/${id}`);
    }
  };


  const handleReset = () => {
    const emptyFilters = getDefualtFilter();

    setFiltersDraft(emptyFilters);
    setFiltersApplied(emptyFilters);
    setTabValue(false);
    setPage(1);
  };


  const handleToggleLike = async (id) => {
    try {
      const result = await toggleFavorite(id);

      if (filtersApplied.likeOnly && !result.data.liked) {
        setActors(prev =>
          prev.filter(actor => actor.id !== id)
        );

        return;
      }

      setActors(prev =>
        prev.map(actor =>
          actor.id === id
            ? {
                ...actor,
                is_liked: result.data.liked
              }
            : actor
        )
      );
    } catch (err) {
      console.error(err);
    }
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
          onChange={handleTabChange}
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: 'rgba(8, 94, 75, 1)',
              height: 3,
            }
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
          <Grid container spacing={3} sx={{justifyContent: 'center'}} >

            <Grid size={{ md: 2 }}>
              <CatalogFilter
                filters={filtersDraft}
                onChange={setFiltersDraft}
                onApply={handleApply}
                onReset={handleReset}
              />
            </Grid>

            <Grid size={{ md: 7 }}>
              <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'start' }}
              >
                {actors.map((actor) => (
                  <Grid
                    key={actor.id}
                    size={{ xs: 12, sm: 6, lg: 4 }}
                  >
                    <ActorCard
                      {...actor}
                      onOpenProfile={() => clickProfile(actor.id)}
                      onToggleLike={() =>
                        handleToggleLike(actor.id)
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

            <Grid size={{ md: 2.5 }}>
              <PremiumPanel />
            </Grid>

          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default CatalogPage;

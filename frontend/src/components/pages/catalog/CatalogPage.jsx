import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import { Box, Container, Grid } from '@mui/material';
import ActorCard from './organisms/ActorCard';
import CategoryTab from '../../shared/tabs/CategoryTab';

const CatalogPage = () => {
  const [tabValue, setTabValue] = useState(0);

  const actors = [
    {
      id: 1,
      name: 'Иван Петров',
      image: 'https://avatars.mds.yandex.net/i?id=65a85fef39b9909ffda1bdac78e2995f_l-3932796-images-thumbs&n=13',
      avatar: '/avatar-placeholder.jpg',
      category: 'Гитарист',
      rating: 4.5,
      reviewCount: 25,
      price: 2500,
      description: 'Опытный гитарист с 10-летним стажем. Играет джаз, рок, фолк.',
      isLiked: false,
    },
    {
      id: 2,
      name: 'Мария Сидорова',
      image: 'https://img.magnific.com/free-photo/front-view-handsome-male-musician-holding-saxophone_23-2148730910.jpg?semt=ais_hybrid',
      avatar: '/avatar-placeholder.jpg',
      category: 'Вокалистка',
      rating: 4.8,
      reviewCount: 42,
      price: 3000,
      description: 'Профессиональная вокалистка. Специализируюсь на джазе и попсе.',
      isLiked: false,
    },
    {
      id: 3,
      name: 'Алексей Волков',
      image: 'https://avatars.mds.yandex.net/i?id=9bd18b19978921ce65c13d24248a9a4e_l-5231267-images-thumbs&n=13',
      avatar: '/avatar-placeholder.jpg',
      category: 'Пианист',
      rating: 4.6,
      reviewCount: 18,
      price: 3500,
      description: 'Классический пианист, готов исполнять композиции любого стиля.',
      isLiked: false,
    },
    {
      id: 4,
      name: 'Шикарный басист',
      image: 'https://i.pinimg.com/736x/78/bc/55/78bc55ecfe53f7abf7e12edbe5b36bc4.jpg',
      avatar: '/avatar-placeholder.jpg',
      category: 'Гитарист',
      rating: 5.0,
      reviewCount: 24,
      price: 6000,
      description: 'Просто стоит. Всё равно не слышно.',
      isLiked: false,
    },
    {
      id: 5,
      name: 'Ольга Морозова',
      image: 'https://media.istockphoto.com/id/1470763004/tr/fotoğraf/woman-playing-the-violin.jpg?s=170667a&w=0&k=20&c=lcxBn8eVQzzJ8heecbBmx5cKcs9RCKiXNSGdVXg33YA=',
      avatar: '/avatar-placeholder.jpg',
      category: 'Скрипачка',
      rating: 5.0,
      reviewCount: 33,
      price: 4000,
      description: 'Концертирующая скрипачка, сольные выступления и камерная музыка.',
      isLiked: false,
    },{
      id: 6,
      name: 'Полина Скалл',
      image: 'https://thumbs.dreamstime.com/b/творчество-и-музыка-молодая-красивая-девушка-играет-на-барабанах-187280556.jpg',
      avatar: '/avatar-placeholder.jpg',
      category: 'Барабанщик',
      rating: 5.0,
      reviewCount: 40,
      price: 2500,
      description: 'Ударные - лучший кайф!',
      isLiked: false,
    }
  ];

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

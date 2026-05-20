import React, { useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ActorCard from '../components/pages/catalog/organisms/ActorCard';
import RegisterModal from '../features/authModal/RegisterModal';
import LoginModal from '../features/authModal/LoginModal';

const CatalogPage = () => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleOpenRegister = () => setRegisterModalOpen(true);
  const handleCloseRegister = () => setRegisterModalOpen(false);
  const handleOpenLoginModal = () => setIsOpenLoginModal(true);
  const handleCloseLoginModal = () => setIsOpenLoginModal(false);

  // Тестовые данные актеров
  const actors = [
    {
      id: 1,
      name: 'Иван Петров',
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
      name: 'Ольга Морозова',
      avatar: '/avatar-placeholder.jpg',
      category: 'Скрипачка',
      rating: 5.0,
      reviewCount: 33,
      price: 4000,
      description: 'Концертирующая скрипачка, сольные выступления и камерная музыка.',
      isLiked: false,
    },
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
      <Header onRegisterClick={handleOpenRegister} onLoginClick={handleOpenLoginModal} />

      {/* Основной контент каталога */}
      <Box sx={{ flex: 1, py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {actors.map((actor) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
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

      <Footer />

      {/* Модалки */}
      <RegisterModal open={isRegisterModalOpen} onClose={handleCloseRegister} />
      <LoginModal open={isOpenLoginModal} onClose={handleCloseLoginModal} />
    </Box>
  );
};

export default CatalogPage;

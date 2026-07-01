import React from 'react';
import { Box } from '@mui/material';
import NavButton from '../atoms/NavButton';

const NavMenu = () => {
  const menuItems = ['Главная', 'Поиск', 'Кабинет'];

  // заглушка для хедера. Потом нужно добавить логику с роутами на ЛК, '/', '/catalog'
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
      {menuItems.map((item) => (
        <NavButton key={item} label={item} />
      ))}
    </Box>
  );
};

export default NavMenu;
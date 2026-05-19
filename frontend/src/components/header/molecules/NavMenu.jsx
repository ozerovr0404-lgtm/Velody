import React from 'react';
import { Box } from '@mui/material';
import NavButton from '../atoms/NavButton';

const NavMenu = () => {
  const menuItems = ['Главная', 'Поиск', 'Кабинет'];

  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
      {menuItems.map((item) => (
        <NavButton key={item} label={item} />
      ))}
    </Box>
  );
};

export default NavMenu;
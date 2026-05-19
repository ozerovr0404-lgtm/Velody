import React from 'react';
import { Box } from '@mui/material';
import FooterButton from '../atoms/FooterButton';

const FooterLinks = () => {
  const links = ['Главная', 'Поиск', 'Кабинет', 'Контакты'];
  
  return (
    <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
      {links.map((link) => (
        <FooterButton key={link} label={link} />
      ))}
    </Box>
  );
};

export default FooterLinks;
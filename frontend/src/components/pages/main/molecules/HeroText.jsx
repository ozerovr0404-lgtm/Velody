// src/components/main/molecules/HeroText.jsx
import { Box, colors } from '@mui/material';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import ActionButton from '../atoms/ActionButton';
import CategoryImage from '../atoms/CategoryImage';
import { UserContext } from '../../../../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroText = () => {

  const { user, openLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const redirectToMyProfile = () => {
    if (!user) {
      openLogin?.();
      return
    }

    navigate(`/profile/${user.profileId}`);
  }


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '800px', alignItems: 'center', margin: '10px 50px', gap: '10px' }}>
      <Title />
      <Subtitle />

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', margin: '0 10px 40px' }}>
        <ActionButton label="Найти музыканта" navigateTo="/catalog" />
        <ActionButton label="Предложить услуги" onClick={redirectToMyProfile} /> {/* здесь нужно добавить открытие модалки логина */}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '10px' }}>
        <CategoryImage imageSrc="/GuitarCategory.jpg" navigateTo="/catalog">
          Гитара
        </CategoryImage>
        <CategoryImage imageSrc="/PianoCategory.jpg" navigateTo="/catalog">
          Фортепиано
        </CategoryImage>
        <CategoryImage imageSrc="/DrumsCategory.jpg" navigateTo="/catalog">
          Ударные
        </CategoryImage>
        <CategoryImage imageSrc="/VocalCategory.jpg" navigateTo="/catalog">
          Вокал
        </CategoryImage>
        <CategoryImage imageSrc="/OperatorCategory.jpg" navigateTo="/catalog">
          Оператор
        </CategoryImage>
        <CategoryImage imageSrc="/SoundOperatorCategory.jpg" navigateTo="/catalog">
          Звукорежиссер
        </CategoryImage>
      </Box>

    </Box>
  );
};

export default HeroText;
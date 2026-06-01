// src/components/main/molecules/HeroText.jsx
import { Box, colors } from '@mui/material';
import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';
import ActionButton from '../atoms/ActionButton';
import CategoryImage from '../atoms/CategoryImage';

const HeroText = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '800px', alignItems: 'center', margin: '10px 50px', gap: '10px' }}>
      <Title />
      <Subtitle />

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', margin: '0 10px 40px' }}>
        <ActionButton label="Найти музыканта" navigateTo="/catalog" />
        <ActionButton label="Предложить услуги" />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '10px' }}>
        <CategoryImage imageSrc="/GuitarCategory.jpg">
          Гитара
        </CategoryImage>
        <CategoryImage imageSrc="/PianoCategory.jpg">
          Фортепиано
        </CategoryImage>
        <CategoryImage imageSrc="/DrumsCategory.jpg">
          Ударные
        </CategoryImage>
        <CategoryImage imageSrc="/VocalCategory.jpg">
          Вокал
        </CategoryImage>
        <CategoryImage imageSrc="/OperatorCategory.jpg">
          Оператор
        </CategoryImage>
        <CategoryImage imageSrc="/SoundOperatorCategory.jpg">
          Звукорежиссер
        </CategoryImage>
      </Box>

    </Box>
  );
};

export default HeroText;
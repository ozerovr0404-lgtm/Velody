import { Box, colors } from '@mui/material';
import Title from '../heroComponents/Title';
import Subtitle from '../heroComponents/Subtitle';
import ActionButton from '../heroComponents/ActionButton';
import CategoryImage from '../heroComponents/CategoryImage';
import { UserContext } from '../../../../context/UserContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {

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
        <ActionButton label="Предложить услуги" onClick={redirectToMyProfile} />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', padding: '10px' }}>
        <CategoryImage imageSrc="/GuitarCategory.jpg" navigateTo="/catalog?tab=0">
          Гитара
        </CategoryImage>
        <CategoryImage imageSrc="/PianoCategory.jpg" navigateTo="/catalog?tab=1">
          Фортепиано
        </CategoryImage>
        <CategoryImage imageSrc="/DrumsCategory.jpg" navigateTo="/catalog?tab=2">
          Ударные
        </CategoryImage>
        <CategoryImage imageSrc="/VocalCategory.jpg" navigateTo="/catalog?tab=3">
          Вокал
        </CategoryImage>
        <CategoryImage imageSrc="/OperatorCategory.jpg" navigateTo="/catalog?tab=4">
          Оператор
        </CategoryImage>
        <CategoryImage imageSrc="/SoundOperatorCategory.jpg" navigateTo="/catalog?tab=5">
          Звукорежиссер
        </CategoryImage>
      </Box>

    </Box>
  );
};

export default FirstPage;
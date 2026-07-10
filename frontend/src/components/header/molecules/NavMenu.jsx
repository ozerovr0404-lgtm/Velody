import { 
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { useContext } from 'react';

const NavMenu = ({ onOpenLogin }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const clickToProfile = () => {
    if (!user) {
      onOpenLogin?.();
      return
    }

    navigate(`/profile/${user.profileId}`);
  }

  const clickToMainPage = () => {
    navigate('/')
  }

  const clickToCatalogPage = () => {
    navigate('/catalog')
  }
 
  return (
    <Box 
      sx={{ 
        display: { xs: 'none', md: 'flex' }, 
        gap: 3, 
        '& .MuiButton-root': {
          fontSize: '15px',
          color: 'rgba(8, 94, 75, 1)'
        }
      }}>
      <Button
        onClick={clickToMainPage}
      >
        Главная
      </Button>
      <Button
        onClick={clickToCatalogPage}
      >
        Поиск
      </Button>
      <Button
        onClick={clickToProfile}
      >
        Кабинет
      </Button>
    </Box>
  );
};

export default NavMenu;
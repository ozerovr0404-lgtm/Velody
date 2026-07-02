import { 
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NavMenu = () => {
  const navigate = useNavigate();

  const clickToProfile = (id) => {
    {/*  */}
    navigate(`/profile/${id}`);
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
      <Button>
        Кабинет
      </Button>
    </Box>
  );
};

export default NavMenu;
import { Box } from '@mui/material';
import MainButton from '../../shared/buttons/MainButton';

const AuthButtons = ({ onRegisterClick, onLoginClick }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <MainButton label="Войти" color="rgba(8, 94, 75, 1)" backgroundColor="rgba(255, 255, 255, 1)" onClick={onLoginClick} />
      <MainButton label="Регистрация" color="white" backgroundColor="rgba(8, 94, 75, 1)" onClick={onRegisterClick} />
    </Box>
  );
};

export default AuthButtons;
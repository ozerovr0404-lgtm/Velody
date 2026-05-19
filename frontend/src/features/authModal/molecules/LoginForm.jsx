import Box from '@mui/material/Box';
import AuthTitle from '../atoms/AuthTitle';
import AuthUserField from '../atoms/AuthUserField';
import MainButton from '../../../components/shared/buttons/MainButton';

const LoginForm = () => {
  return (
    <Box
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        height: '250px',
        gap: '25px'
      }}
    >
      <AuthTitle title="Авторизация" />

      <AuthUserField 
        label="Email"
        type="email"
      />

      <AuthUserField
        label="Пароль"
        type="password"
      />

      <MainButton 
        label="Войти"
        color="white" backgroundColor="rgba(8, 94, 75, 1)"
      />

    </Box>
  );
};

export default LoginForm;
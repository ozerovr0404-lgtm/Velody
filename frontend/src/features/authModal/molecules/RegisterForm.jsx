import Box from '@mui/material/Box';
import AuthTitle from '../atoms/AuthTitle';
import AuthUserField from '../atoms/AuthUserField';
import MainButton from '../../../components/shared/buttons/MainButton';

const RegisterForm = () => {
  return (
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        height: '371px',
        gap: '22px'
      }}
    >
      <AuthTitle title="Регистрация" />

      <AuthUserField
        label="Имя"
        type="text"
      />

      <AuthUserField
        label="Email"
        type="email"
      />

      <AuthUserField
        label="Пароль"
        type="password"
      />

      <AuthUserField
        label="Повторите пароль"
        type="password"
      />

      <MainButton label="Зарегистрироваться" color="white" backgroundColor="rgba(8, 94, 75, 1)" />

    </Box>
  );
};

export default RegisterForm;
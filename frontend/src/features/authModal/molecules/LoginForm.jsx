import { useState } from 'react';
import Box from '@mui/material/Box';
import AuthTitle from '../atoms/AuthTitle';
import AuthUserField from '../atoms/AuthUserField';
import MainButton from '../../../components/shared/buttons/MainButton';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Ошибка авторизации!')
        return;
      }

    } catch (err) {
      setError('Ошибка соединения с сервером!')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthUserField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <MainButton 
        type="submit"
        label="Войти"
        color="white" backgroundColor="rgba(8, 94, 75, 1)"
      />

    </Box>
  );
};

export default LoginForm;
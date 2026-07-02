import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import AuthTitle from '../atoms/AuthTitle';
import AuthUserField from '../atoms/AuthUserField';
import MainButton from '../../../components/shared/buttons/MainButton';
import { registerUser } from '../../../services/authUser/registerUser';

const RegisterForm = ({ onClose }) => {

  const [stage_name, setStage_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== repeatPassword) {
      setError('Пароли должны совпадать!');
      return;
    }

    try {
      const res = await registerUser(stage_name, email, password, phone);
      
        onClose?.();

        navigate(`/profile/${res.profile.id}`);

    } catch (err) {
      setError('Ошибка регистрации!');
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
          height: '430px',
          gap: '22px'
        }}
    >

      <AuthTitle title="Регистрация" />

      <AuthUserField
        label="Имя"
        type="text"
        value={stage_name}
        onChange={(e) => setStage_name(e.target.value)}
      />

      <AuthUserField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <AuthUserField 
        label="Номер телефона"
        type="tel"
        placeholder="+79009009090"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <AuthUserField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <AuthUserField
        label="Повторите пароль"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />

      <MainButton type="submit" label="Зарегистрироваться" color="white" backgroundColor="rgba(8, 94, 75, 1)" />

    </Box>
  );
};

export default RegisterForm;
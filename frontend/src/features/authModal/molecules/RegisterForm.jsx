import { useState } from 'react';
import { Box } from '@mui/material';
import AuthTitle from '../atoms/AuthTitle';
import AuthUserField from '../atoms/AuthUserField';
import MainButton from '../../../components/shared/buttons/MainButton';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';

const RegisterForm = ({ onClose }) => {

  const [stage_name, setStage_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [role, setRole] = useState(null);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const status = 'ACTIVE'
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== repeatPassword) {
      setError('Пароли должны совпадать!');
      return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ stage_name, email, password, status, role, phone })
          });
        
          const data = await response.json();

          if (!response.ok) {
            setError(data.error || 'Ошибка регистрации!')
            return;
          }

          console.log(data);

          if (response.ok) {
            onClose?.();
          }

      } catch (err) {
        setError('Ошибка соединения с сервером!');
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
          height: '510px',
          gap: '22px'
        }}
    >

      <AuthTitle title="Регистрация" />

      <FormControl fullWidth>
        <InputLabel id='role-label'>
          В качестве кого?
        </InputLabel>

        <Select
          label="Ищу или предлагаю?"
          type="select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          sx={{
            width: '100%',
            height: '50px',
            borderColor: '#979797'
          }}
        >
          <MenuItem value='CLIENT'>Ищу</MenuItem>
          <MenuItem value='ARTIST'>Предлагаю</MenuItem>
        </Select>
      </FormControl>

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
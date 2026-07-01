import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

const Logo = () => {

  const navigate = useNavigate();

  return (
    <Typography 
      variant="h5" 
      onClick={() => navigate("/")} 
      sx={{ 
        fontWeight: 700, 
        alignItems: 'center', 
        display: 'flex',
        cursor: 'pointer'
      }}>
      <img 
        
        src="/Frame.svg" 
        alt="Velody" 
        style={{ 
          marginRight: '10px'
        }} 
      />
        Velody
    </Typography>
  );
};

export default Logo;
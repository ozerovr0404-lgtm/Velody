import { Button } from '@mui/material';

const MainButton = ({ label, color, backgroundColor, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        textTransform: 'none',
        fontWeight: 500,
        width: '165px',
        fontSize: '16px',
        backgroundColor: backgroundColor,
        color: color,
        '&:hover': {
          backgroundColor: backgroundColor ? `${backgroundColor}dd` : 'rgba(0, 0, 0, 0.1)',
        },
        border: '1px solid transparent',
        borderColor: 'rgba(8, 94, 75, 1)'
      }}
    >
      {label}
    </Button>
  );
};

export default MainButton;
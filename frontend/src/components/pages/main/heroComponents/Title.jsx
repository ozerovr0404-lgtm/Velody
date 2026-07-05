import { Typography } from '@mui/material';

const Title = () => {
  return (
    <Typography
      variant="h2"
      sx={{
        fontWeight: 500,
        fontSize: { xs: '2rem', sm: '3rem', md: '3rem' },
        lineHeight: 1.2,
        margin: '5px 5px 20px',
        alignItems: 'center'
      }}
    >
      Найди своего музыканта
    </Typography>
  );
};

export default Title;
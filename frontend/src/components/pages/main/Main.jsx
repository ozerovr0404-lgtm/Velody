import { Box, Container } from '@mui/material';
import FirstPage from './heroBlocks/HeroText';

const Main = () => {
  return (
    <Box component="main" sx={{ 
      flex: 1,
      py: { xs: 4, md: 2 } 
      }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'column' },
          alignItems: 'center',
          padding: '10px',
          gap: 4,
        }}
      >
        <FirstPage />
      </Container>
    </Box>
  );
};

export default Main;
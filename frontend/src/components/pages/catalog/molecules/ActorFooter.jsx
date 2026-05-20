import { Box, Typography } from '@mui/material';
import ActorButton from '../atoms/ActorButton';

const ActorFooter = ({ price, onContact }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        mt: 'auto',
      }}
    >
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            fontSize: '0.75rem',
            display: 'block',
          }}
        >
          начиная с
        </Typography>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: 'rgba(8, 94, 75, 1)',
          }}
        >
          {price}$
        </Typography>
      </Box>

      <Box sx={{ width: '120px' }}>
        <ActorButton label="Подробнее" onClick={onContact} />
      </Box>
    </Box>
  );
};

export default ActorFooter;

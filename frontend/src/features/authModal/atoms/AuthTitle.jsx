import { Typography } from '@mui/material';

const AuthTitle = ({ title }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        fontWeight: 700,
        textAlign: 'center'
      }}
    >
      {title}
    </Typography>
  );
};

export default AuthTitle;
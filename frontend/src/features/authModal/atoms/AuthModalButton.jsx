import Button from '@mui/material/Button';

const AuthModalButton = ({
  label,
  variant = 'contained',
}) => {
  return (
    <Button
      variant={variant}
      fullWidth
      sx={{
        mt: 2,
        py: 1.5,
        borderRadius: '14px',
        textTransform: 'none',
        fontWeight: 600,
        fontSize: '1rem',
      }}
    >
      {label}
    </Button>
  );
};

export default AuthModalButton;
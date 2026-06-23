import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import LoginForm from './molecules/LoginForm';

const LoginModal = ({ open, onClose }) => {
  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      disableScrollLock
      maxWidth="sm"
      fullWidth
    >
      <Box
        sx={{
          p: "25px",
          backgroundColor: '#ffffffff',
        }}
      >
        <LoginForm />

      </Box>
    </Dialog>
  );
};

export default LoginModal;
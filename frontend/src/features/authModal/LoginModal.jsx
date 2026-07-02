import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import LoginForm from './molecules/LoginForm';

const LoginModal = ({ open, onClose, onSwitchToRegister }) => {
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
        <LoginForm 
          onClose={onClose} 
          onSwitchToRegister={onSwitchToRegister}
        />

      </Box>
    </Dialog>
  );
};

export default LoginModal;
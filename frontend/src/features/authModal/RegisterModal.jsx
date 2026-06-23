import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import RegisterForm from './molecules/RegisterForm';

const RegisterModal = ({ open, onClose }) => {
  
  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <Box
        sx={{
          p: "25px",
          backgroundColor: '#ffffffff',
        }}
      >
        <RegisterForm />

      </Box>
    </Dialog>
  );
};

export default RegisterModal;
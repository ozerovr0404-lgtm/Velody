import TextField from '@mui/material/TextField';

const AuthUserField = ({
  label,
  type = 'text',
}) => {
  return (
    <TextField
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      sx={{
        width: '100%',
        height: '45px',
        borderColor: '#979797'
      }}
    />
  );
};

export default AuthUserField;
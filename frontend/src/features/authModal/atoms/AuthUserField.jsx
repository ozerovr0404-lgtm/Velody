import TextField from '@mui/material/TextField';

const AuthUserField = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      type={type}
      placeholder={placeholder}
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
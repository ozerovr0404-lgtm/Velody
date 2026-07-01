import Tab from '@mui/material/Tab';

const CategoryTab = ({ value, label }) => {
  return (
    <Tab
      disableRipple
      value={value}
      label={label}
      sx={{
        textTransform: 'none',
        minHeight: 50,
        minWidth: 50,
        padding: '8px 40px',
        margin: '0 10px',
        color: '#000000ff',
        fontSize: '16px',

        borderBottom: '2px solid transparent',
        transition: 'border-color 0.2s ease',

        '&:hover': {
          borderBottom: '2px solid rgba(3, 59, 47, 1)',
        },

        '&.Mui-selected': {
          color: '#000000ff',
          borderBottom: '2px solid rgba(3, 59, 47, 1) !important',
        },
      }}
    />
  );
}

export default CategoryTab;
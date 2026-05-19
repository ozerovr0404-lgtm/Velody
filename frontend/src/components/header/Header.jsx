import { AppBar, Toolbar, Box } from '@mui/material';
import Logo from './atoms/Logo';
import NavMenu from './molecules/NavMenu';
import AuthButtons from './molecules/AuthButtons';
import MenuIcon from './atoms/MenuIcon';

const Header = ({ onRegisterClick, onLoginClick }) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, sm: 3 },
        py: { xs: 1, sm: 2 },
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <NavMenu />
          <AuthButtons onRegisterClick={onRegisterClick} onLoginClick={onLoginClick}/>
          <MenuIcon />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
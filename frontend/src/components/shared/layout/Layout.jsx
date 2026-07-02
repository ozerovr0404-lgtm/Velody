import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import RegisterModal from "../../../features/authModal/RegisterModal";
import LoginModal from "../../../features/authModal/LoginModal";
import './Layout.css'

const Layout = () => {

  const [authModal, setUathModal] = useState({
    open: false,
    mode: 'login'
  });
  
  const openLogin = () => {
    setUathModal({
      open: true,
      mode: 'login'
    });
  };

  const openRegister = () => {
    setUathModal({
      open: true,
      mode: 'register'
    });
  };

  const closeAuth = () => {
    setUathModal({
      open: false,
      mode: 'login'
    });
  };

  return (
    <>
      <Header onRegisterClick={openRegister} onLoginClick={openLogin} />
        <div className="appLayout">
          <Outlet />
        </div>
      <Footer />

      <RegisterModal 
        open={authModal.open && authModal.mode === 'register'} 
        onClose={closeAuth} 
        onSwitchToLogin={openLogin}
      />
      <LoginModal 
        open={authModal.open && authModal.mode === 'login'} 
        onClose={closeAuth} 
        onSwitchToRegister={openRegister}
      />
      
    </>
  )
};

export default Layout;
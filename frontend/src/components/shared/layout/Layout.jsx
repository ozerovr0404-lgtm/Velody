import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";

import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import RegisterModal from "../../../features/authModal/RegisterModal";
import LoginModal from "../../../features/authModal/LoginModal";

import { UserContext } from "../../../context/UserContext";
import "./Layout.css";

const Layout = () => {
  const { logout } = useContext(UserContext);

  const [authModal, setAuthModal] = useState({
    open: false,
    mode: "login",
  });

  const openLogin = () => {
    setAuthModal({ open: true, mode: "login" });
  };

  const openRegister = () => {
    setAuthModal({ open: true, mode: "register" });
  };

  const closeAuth = () => {
    setAuthModal({ open: false, mode: "login" });
  };

  return (
    <>
      <Header
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
        onLogoutClick={logout}
      />

      <main className="appLayout">
        <Outlet />
      </main>

      <Footer />

      <RegisterModal
        open={authModal.open && authModal.mode === "register"}
        onClose={closeAuth}
        onSwitchToLogin={openLogin}
      />

      <LoginModal
        open={authModal.open && authModal.mode === "login"}
        onClose={closeAuth}
        onSwitchToRegister={openRegister}
      />
    </>
  );
};

export default Layout;
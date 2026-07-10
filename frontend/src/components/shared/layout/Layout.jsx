import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import RegisterModal from "../../../features/authModal/RegisterModal";
import LoginModal from "../../../features/authModal/LoginModal";
import { UserContext } from "../../../context/UserContext";
import "./Layout.css";

const Layout = () => {
  const {
    authModal,
    openLogin,
    openRegister,
    closeAuth,
    logout
  } = useContext(UserContext);

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
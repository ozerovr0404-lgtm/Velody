import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import RegisterModal from "../../../features/authModal/RegisterModal";
import LoginModal from "../../../features/authModal/LoginModal";

const Layout = () => {

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const handleOpenRegister = () => setRegisterModalOpen(true);
  const handleCloseRegister = () => setRegisterModalOpen(false);
  const handleOpenLoginModal = () => setIsOpenLoginModal(true);
  const handleCloseLoginModal = () => setIsOpenLoginModal(false);

  return (
    <>
      <Header onRegisterClick={handleOpenRegister} onLoginClick={handleOpenLoginModal} />
      <Outlet />
      <Footer />

      <RegisterModal open={isRegisterModalOpen} onClose={handleCloseRegister} />
      <LoginModal open={isOpenLoginModal} onClose={handleCloseLoginModal} />
    </>
  )
};

export default Layout;
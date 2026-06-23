import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import RegisterModal from "../../../features/authModal/RegisterModal";
import LoginModal from "../../../features/authModal/LoginModal";
import './Layout.css'

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
        <div className="appLayout">
          <Outlet />
        </div>
      <Footer />

      <RegisterModal open={isRegisterModalOpen} onClose={handleCloseRegister} />
      <LoginModal open={isOpenLoginModal} onClose={handleCloseLoginModal} />
      
    </>
  )
};

export default Layout;
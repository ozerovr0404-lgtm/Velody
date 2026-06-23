import React, { useState } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Main from "./components/pages/main/Main";
import RegisterModal from "./features/authModal/RegisterModal";
import LoginModal from "./features/authModal/LoginModal";

const App = () => {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);


  const handleOpenRegister = () => setRegisterModalOpen(true);
  const handleCloseRegister = () => setRegisterModalOpen(false);
  const handleOpenLoginModal = () => {setIsOpenLoginModal(true)};
  const handleCloseLoginModal =() => {setIsOpenLoginModal(false)};

  return (
    <>
      <Main />
      <RegisterModal open={isRegisterModalOpen} onClose={handleCloseRegister} />
      <LoginModal open={isOpenLoginModal} onClose={handleCloseLoginModal} />
    </>
  );
};

export default App;

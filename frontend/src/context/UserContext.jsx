import React, { createContext, useState } from "react";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
  });

  //Добавить проверку сохранённого юзера

  const contextValue = {
    // докинуть нужные пропсы для юзера
    user,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };

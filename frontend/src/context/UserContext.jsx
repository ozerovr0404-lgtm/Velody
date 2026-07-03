import React, { createContext, useState, useEffect } from "react";


const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  const loadUser = async () => {
    setLoading(true);
    
    try {
      const result = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include'
      });

      const data = await result.json();

      if (result.ok && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }

    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const contextValue = {
    user,
    setUser,
    loadUser,
    loading
  }

  return (
    <UserContext.Provider 
      value={contextValue}>
        {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

import React, { createContext, useState, useEffect } from "react";
import { logoutUser } from "../services/authUser/logoutUser";


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
        return data.user;
        
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
    let interval;

    const init = async () => {
      const user = await loadUser();

      if (user) {
        interval = setInterval(() => {
          loadUser();
        }, 60_000);
      }
    };

    init();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);


  const logout = async () => {
    await logoutUser();
    setUser(null);
  };


  const contextValue = {
    user,
    setUser,
    loadUser,
    loading,
    logout
  }

  return (
    <UserContext.Provider 
      value={contextValue}>
        {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

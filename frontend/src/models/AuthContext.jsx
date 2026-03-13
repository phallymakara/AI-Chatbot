import React, { createContext, useState, useEffect } from "react";
import { msalInstance, loginRequest } from "../auth/msalConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem("hr_user_session");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
        setIsInitialized(true);
        return;
      }

      // Check MSAL session
      const accounts = msalInstance.getAllAccounts();

      if (accounts.length > 0) {
        const account = accounts[0];

        try {
          const tokenResponse = await msalInstance.acquireTokenSilent({
            ...loginRequest,
            account,
          });

          const accessToken = tokenResponse.accessToken;

          const payload = JSON.parse(atob(accessToken.split(".")[1]));

          const userData = {
            name: account.name,
            email: account.username,
            tenantId: payload.tid,
            accessToken: accessToken,
            role: "user",
          };

          setUser(userData);
          localStorage.setItem("hr_user_session", JSON.stringify(userData));
        } catch (error) {
          console.error("Silent login failed:", error);
        }
      }

      setIsInitialized(true);
    };

    initializeAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("hr_user_session", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("hr_user_session");

    // logout from Microsoft Entra
    msalInstance.logoutPopup();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isInitialized,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

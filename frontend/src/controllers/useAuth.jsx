import { useContext } from "react";
import { AuthContext } from "../models/AuthContext.jsx";

export const useAuth = () => {
  const { user, setUser, isInitialized } = useContext(AuthContext);

  // Added 'async' here so the function can 'await' the delay
  const login = async (email, password) => {
    // 1. ADDED: Artificial delay to test/show the loading spinner
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // --- DEV MODE SHORTCUTS ---
    let role = "";
    let name = "";

    if (email === "admin" || email === "admin@hr.com") {
      role = "admin";
      name = "System Admin";
    } else if (email === "user" || email === "user@hr.com") {
      role = "user";
      name = "Sarah Smith";
    }

    // If a role was matched, log them in immediately
    if (role) {
      const userData = { email, role, name };
      setUser(userData);
      localStorage.setItem("hr_user_session", JSON.stringify(userData));
      return { success: true };
    }

    // Standard Login Logic (for everything else)
    if (email && password) {
      const standardRole = email.includes("admin") ? "admin" : "user";
      const userData = { email, role: standardRole, name: "New User" };
      setUser(userData);
      localStorage.setItem("hr_user_session", JSON.stringify(userData));
      return { success: true };
    }

    // If login fails, throw an error or return failure
    return { success: false, message: "Invalid credentials" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("hr_user_session");
  };

  return { user, login, logout, isInitialized };
};

import React from "react";
import { useAuth } from "../controllers/useAuth";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
      Logout
    </button>
  );
};

export default LogoutButton;

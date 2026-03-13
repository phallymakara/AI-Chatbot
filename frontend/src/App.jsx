import React from "react";
import { AuthProvider } from "./models/AuthContext.jsx";
import { DocProvider } from "./models/DocContext.jsx";
import { useAuth } from "./controllers/useAuth.jsx";

// Import your Views
import Login from "./views/auth/Login.jsx";
import AdminPortal from "./views/admin/AdminPortal.jsx";
import ChatInterface from "./views/user/ChatInterface.jsx";

const NavigationGatekeeper = () => {
  const { user, isInitialized } = useAuth();

  // 1. Wait for the app to check localStorage
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen text-blue-600 font-bold">
        Loading System...
      </div>
    );
  }

  // 2. IF NO USER IS LOGGED IN
  if (!user) {
    return <Login />;
  }

  // 3. IF USER IS LOGGED IN, SWITCH VIEW BASED ON ROLE
  return user.role === "admin" ? <AdminPortal /> : <ChatInterface />;
};

export default function App() {
  return (
    <AuthProvider>
      <DocProvider>
        <NavigationGatekeeper />
      </DocProvider>
    </AuthProvider>
  );
}

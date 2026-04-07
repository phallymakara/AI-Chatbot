import { useEffect, useState, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { ThemeProvider } from "./components/theme-provider";
import { Chat } from "./pages/Chat";
import { Welcome } from "./pages/Welcome";
import { NotImplemented } from "./pages/NotImplemented";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { loginRequest } from "./authConfig";

function App() {
  const [currentPath, setCurrentPath] = useState(
    window.location.hash || "#/welcome",
  );

  const [isReady, setIsReady] = useState(true);

  // 🔄 Router
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || "#/welcome");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isAdmin = true;

  // ✅ PUBLIC UI

  if (currentPath === "#/chat") {
    return (
      <ThemeProvider>
        <Chat />
      </ThemeProvider>
    );
  }

  if (currentPath.startsWith("#/admin")) {
    return (
      <ThemeProvider>
        <AdminLayout />
      </ThemeProvider>
    );
  }

  if (currentPath === "#/not-implemented") {
    return (
      <ThemeProvider>
        <NotImplemented />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <Welcome />
    </ThemeProvider>
  );
}

export default App;

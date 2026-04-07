import { useEffect, useState, useCallback } from "react";
import { useMsal } from "@azure/msal-react";
import { ThemeProvider } from "./components/theme-provider";
import { Chat } from "./pages/Chat";
import { Welcome } from "./pages/Welcome";
import { NotImplemented } from "./pages/NotImplemented";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { loginRequest } from "./authConfig";

function App() {
  const { instance } = useMsal();

  const [currentPath, setCurrentPath] = useState(
    window.location.hash || "#/welcome",
  );

  const [isReady, setIsReady] = useState(false);

  // 🔥 Handle redirect ONCE safely
  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await instance.handleRedirectPromise();

        if (response?.account) {
          instance.setActiveAccount(response.account);
        } else {
          const accounts = instance.getAllAccounts();
          if (accounts.length > 0) {
            instance.setActiveAccount(accounts[0]);
          }
        }
      } catch (error) {
        console.error("Redirect error:", error);
      } finally {
        setIsReady(true); // ✅ allow render after MSAL ready
      }
    };

    initAuth();
  }, [instance]);

  // 🔄 Router
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || "#/welcome");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // 🔐 LOGIN
  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const account = instance.getActiveAccount();
  const idTokenClaims = account?.idTokenClaims as any;
  const roles = idTokenClaims?.roles || [];
  const isAdmin = roles.includes("SystemAdmin") || roles.includes("TenantAdmin");

  useEffect(() => {
    if (account) {
      console.log("\n" + "=".repeat(40));
      console.log("🟢 USER LOGGED IN");
      console.log("User:", account.username);
      console.log("Is Admin:", isAdmin);
      console.log("Roles:", roles);
      
      // Automatic redirection based on role upon login
      if (isAdmin && (currentPath === "#/welcome" || currentPath === "" || currentPath === "#/")) {
        console.log("Redirecting Admin to Dashboard...");
        window.location.hash = "#/admin/dashboard";
      } else if (!isAdmin && currentPath.startsWith("#/admin")) {
        console.log("Access Denied: Redirecting User to Welcome...");
        window.location.hash = "#/welcome";
      }

      instance.acquireTokenSilent({
        ...loginRequest,
        account,
      }).then(response => {
        console.log("Access Token:", response.idToken);
        console.log("=".repeat(40) + "\n");
      });
    }
  }, [account, instance, isAdmin, currentPath]);

  const callApi = useCallback(async () => {
    const account = instance.getActiveAccount();

    if (!account) {
      console.log("No account available for API call");
      return;
    }

    try {
      const tokenResponse = await instance.acquireTokenSilent({
        ...loginRequest,
        account,
      });

      const token = tokenResponse.idToken;
      
      // Explicitly log token for terminal/console visibility
      console.log("-----------------------------------------");
      console.log("MSAL ID TOKEN:", token);
      console.log("IS JWT:", token.startsWith("eyJ"));
      console.log("-----------------------------------------");

      console.log("Sending token to backend for validation...");
      const res = await fetch("http://localhost:8000/api/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Backend Response:", data);
    } catch (error) {
      console.error("API Call or Token Error:", error);
    }
  }, [instance]);

  useEffect(() => {
    // Trigger callApi when account becomes available (sign-in, sign-up, or page load)
    if (isReady && account) {
      callApi();
    }
  }, [isReady, account, callApi]);

  // ⏳ WAIT until MSAL ready
  if (!isReady) {
    return <div>Loading...</div>;
  }

  // 🚫 NOT LOGGED IN
  if (!account) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-2xl border border-border shadow-lg text-center animate-in fade-in zoom-in duration-300">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Proseth Chatbot
              </h1>
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-all shadow-md active:scale-[0.98]">
              Sign In
            </button>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // ✅ LOGGED IN UI

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

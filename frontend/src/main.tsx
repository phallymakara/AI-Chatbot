import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

console.log("%c[MSAL CONFIG]", "color: #20808d; font-weight: bold;", {
  clientId: msalConfig.auth.clientId,
  authority: msalConfig.auth.authority
});

const msalInstance = new PublicClientApplication(msalConfig);

// 🔥 MUST initialize before rendering
async function startApp() {
  await msalInstance.initialize();

  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Root element not found");
  }

  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </React.StrictMode>,
  );
}

startApp();

import React, { useState } from "react";
import { useAuth } from "../../controllers/useAuth.jsx";
import LoginForm from "./LoginForm.jsx";
import SignupForm from "./SignupForm.jsx";

import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth/msalConfig";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signUp } = useAuth();

  const { instance } = useMsal();

  // Microsoft Login (Redirect)
  const handleMicrosoftLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error("Microsoft login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
      <div
        className="w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
        style={{ maxWidth: "455px" }}>
        {/* Header */}
        <div className="bg-blue-900 w-full py-6 flex flex-col items-center justify-center mb-8">
          <div className="text-white font-bold text-xl tracking-tighter uppercase">
            HR-Assistant
          </div>
        </div>

        <div className="px-10 pb-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
          </div>

          {/* Login / Signup Forms */}
          {isLogin ?
            <LoginForm onLogin={login} onToggle={() => setIsLogin(false)} />
          : <SignupForm onSignup={signUp} onToggle={() => setIsLogin(true)} />}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-400 font-medium uppercase tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-4">
            {/* Google Button */}
            <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] text-sm">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                className="w-4 h-4"
                alt="Google"
              />
              Google
            </button>

            {/* Microsoft Login */}
            <button
              onClick={handleMicrosoftLogin}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-100 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all active:scale-[0.98] text-sm">
              <svg
                className="w-4 h-4"
                viewBox="0 0 23 23"
                xmlns="http://www.w3.org/2000/svg">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
              Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

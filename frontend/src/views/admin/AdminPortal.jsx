import React, { useState } from "react";
import Sidebar from "../shared/Sidebar.jsx";
import AdminHeader from "../shared/AdminHeader.jsx";
import { useAdminNav } from "../../controllers/useAdminNav.jsx";
import { useAuth } from "../../controllers/useAuth.jsx";
import DocumentsView from "./DocumentsView.jsx";
import UsageView from "./UsageView.jsx";
import SettingsView from "./SettingsView.jsx";

const AdminPortal = () => {
  const { activeTab, setActiveTab } = useAdminNav();
  const { logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Logout Confirmation Modal Overlay */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-8 rounded-3xl shadow-2xl border border-slate-100 w-full max-w-sm text-center space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-xl tracking-tight">
                Confirm Logout
              </h3>
              <p className="text-slate-500 text-sm mt-2 font-medium px-4">
                Are you sure you want to exit the Admin Portal?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-sm">
                Keep Working
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 rounded-2xl font-bold bg-blue-900 text-white hover:bg-red-600 transition-all text-sm shadow-lg shadow-blue-900/20 active:scale-95">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Static Sidebar - Connected onLogoutClick */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogoutClick={() => setShowLogoutConfirm(true)}
      />

      {/* 2. Main Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header - Connected onLogoutClick */}
        <AdminHeader onLogoutClick={() => setShowLogoutConfirm(true)} />

        {/* Scrollable Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50/30">
          <div className="max-w-7xl mx-auto">
            {activeTab === "documents" && <DocumentsView />}
            {activeTab === "usage" && <UsageView />}
            {activeTab === "settings" && <SettingsView />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPortal;

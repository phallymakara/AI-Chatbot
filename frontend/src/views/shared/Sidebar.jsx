import React from "react";
// Removed useAuth from here as the action is now handled by the parent
import DocumentsIcon from "../../assets/icons/documents.svg";
import UsageIcon from "../../assets/icons/dataUsage.svg";
import SettingsIcon from "../../assets/icons/settingIcon.svg";

const Sidebar = ({ activeTab, setActiveTab, onLogoutClick }) => {
  const menuItems = [
    { id: "documents", label: "Documents", icon: DocumentsIcon },
    { id: "usage", label: "Usage Reports", icon: UsageIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="w-64 bg-blue-50 text-slate-800 flex flex-col h-screen sticky top-0 border-r border-blue-100 overflow-hidden">
      {/* --- Full-Width Header --- */}
      <div className="bg-blue-900 w-full h-20 flex items-center justify-center mb-4">
        <h1 className="text-sm font-black text-white tracking-[0.30em] uppercase">
          ADMIN-Portal
        </h1>
      </div>

      {/* --- Navigation --- */}
      <div className="flex-1 space-y-1">
        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-8 py-4 font-bold transition-all group border-l-4 ${
                activeTab === item.id ?
                  "bg-blue-900 text-white border-blue-900"
                : "text-blue-800 hover:bg-blue-100 hover:text-blue-900 border-transparent"
              }`}>
              <img
                src={item.icon}
                alt=""
                className={`w-5 h-5 transition-all ${
                  activeTab === item.id ?
                    "brightness-0 invert"
                  : "opacity-70 group-hover:opacity-100"
                }`}
              />
              <span className="text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* --- Logout Section: Now triggers the confirmation modal --- */}
      <div className="border-t border-blue-200">
        <button
          onClick={onLogoutClick}
          className="w-full flex items-center justify-between px-8 py-5 bg-white text-blue-900 hover:bg-red-50 hover:text-red-600 transition-all duration-300 group">
          <span className="font-bold text-sm">Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:translate-x-1 transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

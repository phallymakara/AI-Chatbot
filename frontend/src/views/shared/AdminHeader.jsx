import React from "react";
// Assuming you have an HR icon in your assets
import HRIcon from "../../assets/icons/documents.svg";

const AdminHeader = ({ onLogoutClick }) => {
  return (
    <header className="h-16 bg-white border-b border-blue-50 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Left Side: Brand Icon */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shadow-sm">
          <img src={HRIcon} alt="HR" className="w-6 h-6 brightness-0 invert" />
        </div>
        <span className="font-bold text-slate-800 hidden md:block">
          HR Management
        </span>
      </div>

      {/* Right Side: Action Icons */}
      <div className="flex items-center gap-2">
        {/* Notification Icon */}
        <button className="p-2 hover:bg-blue-50 rounded-lg text-slate-500 hover:text-blue-900 transition-colors relative">
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* Email Icon */}
        <button className="p-2 hover:bg-blue-50 rounded-lg text-slate-500 hover:text-blue-900 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </button>

        {/* Setting Icon */}
        <button className="p-2 hover:bg-blue-50 rounded-lg text-slate-500 hover:text-blue-900 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>

        <div className="w-[1px] h-6 bg-blue-100 mx-2"></div>

        {/* Profile/Avatar Placeholder */}
        <div className="flex items-center gap-3 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-800">Admin User</p>
            <p className="text-[10px] text-slate-400">Super Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200"></div>
        </div>

        {/* NEW: Logout Button to trigger modal */}
        <button
          onClick={onLogoutClick}
          className="p-2 ml-1 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all active:scale-90"
          title="Sign Out">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
    </header>
  );
};

export default AdminHeader;

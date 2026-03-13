import React from "react";

const SettingsView = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Settings
      </h1>
      <p className="text-slate-500 mb-8">
        Configure system behavior and AI parameters.
      </p>

      <div className="bg-white rounded-3xl border border-blue-100 shadow-sm divide-y divide-blue-50">
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-700">AI Model Sensitivity</p>
            <p className="text-sm text-slate-400">
              Adjust how strictly the AI follows document facts.
            </p>
          </div>
          <input type="range" className="accent-blue-900" />
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-700">Automatic Re-indexing</p>
            <p className="text-sm text-slate-400">
              Sync documents every 24 hours.
            </p>
          </div>
          <div className="w-12 h-6 bg-blue-900 rounded-full flex items-center px-1 cursor-pointer">
            <div className="bg-white w-4 h-4 rounded-full ml-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

import React from "react";

const UsageView = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
        Usage Reports
      </h1>
      <p className="text-slate-500 mb-8">
        Detailed analytics of AI interactions and storage.
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            Total API Calls
          </p>
          <p className="text-3xl font-bold text-blue-900 mt-2">12,482</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">
            Storage Limit
          </p>
          <p className="text-3xl font-bold text-blue-900 mt-2">1.2 GB / 5 GB</p>
        </div>
      </div>

      <div className="bg-white p-20 rounded-3xl border border-blue-100 shadow-sm text-center">
        <div className="text-4xl mb-4">📊</div>
        <p className="text-slate-400 font-medium italic">
          Visualization data loading...
        </p>
      </div>
    </div>
  );
};

export default UsageView;

import React, { useContext } from "react";
import { DocContext } from "../../models/DocContext.jsx";

const UsageStats = () => {
  const context = useContext(DocContext);

  // Safety Guard: if context is null, use an empty array
  const documents = context ? context.documents : [];

  const stats = [
    { label: "Total Documents", value: documents.length },
    { label: "Chats This Month", value: "325" },
    { label: "Storage Used", value: "1.2 GB" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-400 font-bold mb-4 text-[10px] uppercase tracking-widest">
        System Stats
      </h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0">
            <span className="text-sm text-gray-600 font-medium">
              {stat.label}
            </span>
            <span className="text-sm font-bold text-gray-800">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageStats;

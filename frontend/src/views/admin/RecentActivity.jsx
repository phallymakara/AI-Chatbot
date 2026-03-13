import React from "react";

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      file: "Leave Policy.pdf",
      status: "Indexed Successfully",
      color: "text-blue-600",
    },
    {
      id: 2,
      file: "Benefits Guide.docx",
      status: "Upload Completed",
      color: "text-gray-600",
    },
    {
      id: 3,
      file: "Code of Conduct.pdf",
      status: "Re-indexed",
      color: "text-red-600",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-gray-500 font-bold mb-4 text-sm uppercase tracking-wider">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex items-center gap-3 text-sm">
            <span className="text-xl">📄</span>
            <div>
              <p className="font-semibold text-gray-800">{act.file}</p>
              <p className={`text-xs ${act.color}`}>{act.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;

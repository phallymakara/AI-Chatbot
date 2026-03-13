import React, { useState, useRef } from "react";
import DocumentList from "./DocumentList.jsx";
import { useDocumentActions } from "../../controllers/useDocumentActions.jsx";

const DocumentsView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  // NEW: connect upload action from controller
  const { uploadDocument } = useDocumentActions();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  // UPDATED: send file to backend
  const handleConfirmUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);

      await uploadDocument(selectedFile);

      setSelectedFile(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 relative">
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slideIn 0.3s ease-out forwards;
          }
        `}
      </style>

      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            HR Knowledge Base
          </h1>
          <p className="text-slate-500 text-xs mt-0.5">
            Manage documents and monitor system activity.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95">
          <span className="text-lg">+</span>
          Upload New Document
        </button>
      </div>

      {/* Document Table */}
      <DocumentList />

      {/* Stats & Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
          <h3 className="text-md font-bold text-blue-900 mb-3">
            Recent Activity
          </h3>

          <div className="space-y-3">
            {[
              {
                user: "Admin",
                action: "Uploaded Employee_Handbook.pdf",
                time: "2 mins ago",
              },
              {
                user: "System",
                action: "Re-indexed Leave_Policy.docx",
                time: "1 hour ago",
              },
              {
                user: "Admin",
                action: "Deleted Old_Contract.pdf",
                time: "3 hours ago",
              },
            ].map((activity, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 text-[10px] font-bold">
                    {activity.user[0]}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      {activity.action}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      by {activity.user}
                    </p>
                  </div>
                </div>

                <span className="text-[9px] font-medium text-slate-400 uppercase">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <h3 className="text-md font-bold text-blue-900 mb-5">
            Usage Summary
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-slate-600">
                  Chats
                </span>
                <span className="text-xs font-bold text-blue-900">325</span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: "65%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-medium text-slate-600">
                  Tokens
                </span>
                <span className="text-xs font-bold text-blue-900">
                  1.2M / 2M
                </span>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1.5">
                <div
                  className="bg-indigo-500 h-1.5 rounded-full"
                  style={{ width: "60%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}

      {isModalOpen && (
        <div className="fixed top-16 right-10 z-[999] w-full max-w-sm animate-slide-in">
          <div className="bg-white rounded-2xl shadow-[0_15px_40px_-12px_rgba(0,0,0,0.2)] p-6 border border-blue-50">
            <div className="flex justify-between items-start mb-3">
              <h2 className="text-lg font-bold text-blue-900">
                Upload Document
              </h2>

              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-red-500 transition-colors">
                ✕
              </button>
            </div>

            <div
              onClick={() => fileInputRef.current.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                selectedFile ?
                  "border-emerald-400 bg-emerald-50"
                : "border-blue-100 hover:border-blue-300 bg-blue-50/30"
              }`}>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />

              <div className="text-3xl mb-2">{selectedFile ? "📄" : ""}</div>

              <p className="text-xs font-medium text-slate-700">
                {selectedFile ? selectedFile.name : "Select Document"}
              </p>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                disabled={!selectedFile || isUploading}
                onClick={handleConfirmUpload}
                className={`flex-1 py-2.5 rounded-xl font-bold text-white transition shadow-sm ${
                  selectedFile ?
                    "bg-blue-900 hover:bg-blue-800"
                  : "bg-slate-300 cursor-not-allowed"
                }`}>
                {isUploading ?
                  <div className="flex justify-center items-center gap-2 text-white">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Uploading...
                  </div>
                : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsView;

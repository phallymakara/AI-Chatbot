import React from "react";
// Import the custom hook for document actions
import { useDocumentActions } from "../../controllers/useDocumentActions.jsx";

// DocumentList component to display the list of uploaded documents with actions
const DocumentList = () => {
  const { documents, deleteDocument, reIndexDocument } = useDocumentActions();

  // Render the document list in a table format with action buttons
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/50">
            <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Document Name
            </th>
            <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Date Uploaded
            </th>
            <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Status
            </th>
            <th className="p-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {documents.map((doc) => (
            <tr
              key={doc.id}
              className="hover:bg-slate-50/50 transition-colors group">
              <td className="p-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                    PDF
                  </div>
                  <span className="font-semibold text-slate-700">
                    {doc.name}
                  </span>
                </div>
              </td>
              <td className="p-5 text-sm text-slate-500 font-medium">
                {doc.date}
              </td>
              <td className="p-5">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                    doc.status === "Indexed" ?
                      "bg-emerald-50 text-emerald-600"
                    : "bg-amber-50 text-amber-600"
                  }`}>
                  {doc.status}
                </span>
              </td>
              <td className="p-5 text-right space-x-4">
                <button
                  onClick={() => reIndexDocument(doc.id)}
                  className="text-slate-400 hover:text-indigo-600 font-bold text-xs transition-colors">
                  Re-Index
                </button>
                <button
                  onClick={() => deleteDocument(doc.id)}
                  className="text-slate-400 hover:text-red-500 font-bold text-xs transition-colors">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {documents.length === 0 && (
        <div className="p-20 text-center text-slate-400 font-medium">
          No documents uploaded yet.
        </div>
      )}
    </div>
  );
};

export default DocumentList;

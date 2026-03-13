import React, { createContext, useState } from "react";

export const DocContext = createContext();

export const DocProvider = ({ children }) => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Employee Handbook", status: "Indexed", date: "2026-02-10" },
    { id: 2, name: "Leave Policy", status: "Indexed", date: "2026-02-15" },
    { id: 3, name: "Benefits Guide", status: "Indexed", date: "2026-03-01" },
    { id: 4, name: "Code of Conduct", status: "Indexed", date: "2026-03-04" },
  ]);

  return (
    <DocContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocContext.Provider>
  );
};

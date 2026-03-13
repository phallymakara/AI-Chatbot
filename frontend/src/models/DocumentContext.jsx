import React, { createContext, useState } from "react";

// export the Context itself
export const DocContext = createContext();

// Named export for the Provider that wraps the app
export const DocProvider = ({ children }) => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "Employee Handbook", status: "Indexed" },
    { id: 2, name: "Leave Policy", status: "Indexed" },
    { id: 3, name: "Benefits Guide", status: "Indexed" },
    { id: 4, name: "Code of Conduct", status: "Indexed" },
  ]);

  return (
    <DocContext.Provider value={{ documents, setDocuments }}>
      {children}
    </DocContext.Provider>
  );
};

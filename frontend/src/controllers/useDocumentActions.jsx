import { useState, useEffect } from "react";
import { documentApi } from "../api/documentApi";

export const useDocumentActions = () => {
  const [documents, setDocuments] = useState([]);

  const loadDocuments = async () => {
    try {
      const data = await documentApi.getDocuments();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error("Failed loading documents", err);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const uploadDocument = async (file) => {
    await documentApi.uploadDocument(file);
    await loadDocuments(); // refresh table
  };

  const deleteDocument = async (id) => {
    await documentApi.deleteDocument(id);
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const reIndexDocument = async (id) => {
    await documentApi.reIndexDocument(id);
    await loadDocuments();
  };

  return {
    documents,
    uploadDocument,
    deleteDocument,
    reIndexDocument,
  };
};

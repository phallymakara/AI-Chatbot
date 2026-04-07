import { useAdminStore } from "@/lib/adminStore";
import { useState } from "react";

const ADMIN_API_URL = import.meta.env.VITE_ADMIN_API_URL || "http://127.0.0.1:8000/documents";

/**
 * Custom hook for admin operations
 * Reusable logic for document management and metrics
<<<<<<< HEAD
 * Anonymous access enabled.
=======
>>>>>>> origin/main
 */
export function useAdmin() {
  const { 
    documents, 
    metrics, 
    addDocument, 
    addLink,
    deleteDocument: localDelete, 
    renameDocument,
    updateLink,
    setActiveSection,
    activeSection
  } = useAdminStore();

  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Stores ID of doc being deleted
  const [adminError, setAdminError] = useState<string | null>(null);

<<<<<<< HEAD
=======
  const mockToken = "mock-token";

>>>>>>> origin/main
  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setAdminError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
<<<<<<< HEAD
      const response = await fetch(`${ADMIN_API_URL}/upload`, {
        method: "POST",
=======
      const token = mockToken;

      const response = await fetch(`${ADMIN_API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
>>>>>>> origin/main
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      const newDoc = {
        name: file.name,
        type: file.name.split('.').pop() || 'file',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'indexed' as const,
      };
      
      addDocument(newDoc);
      return { success: true, data };
    } catch (err) {
      console.error("Upload error details:", err);
      let message = "Failed to upload document";
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        message = "Connection failed. Check backend and CORS.";
      } else if (err instanceof Error) {
        message = err.message;
      }
      setAdminError(message);
      return { success: false, error: message };
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddLink = async (name: string, url: string) => {
    setIsUploading(true);
    setAdminError(null);

    try {
<<<<<<< HEAD
=======
      const token = mockToken;

>>>>>>> origin/main
      const response = await fetch(`${ADMIN_API_URL}/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
<<<<<<< HEAD
=======
          Authorization: `Bearer ${token}`,
>>>>>>> origin/main
        },
        body: JSON.stringify({ name, url }),
      });

      if (!response.ok) {
        throw new Error(`Adding link failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Update local store with the new link
      addLink(name, url);
      
      return { success: true, data };
    } catch (err) {
      console.error("Add link error details:", err);
      let message = "Failed to add link";
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        message = "Connection failed. Check backend and CORS.";
      } else if (err instanceof Error) {
        message = err.message;
      }
      setAdminError(message);
      return { success: false, error: message };
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteDocument = async (id: string, filename: string) => {
    setIsDeleting(id);
    setAdminError(null);

    try {
<<<<<<< HEAD
      // For links, we still call the same delete endpoint using the display name (used in IDs)
      const response = await fetch(`${ADMIN_API_URL}/${encodeURIComponent(filename)}`, {
        method: "DELETE",
=======
      const token = mockToken;

      // For links, we still call the same delete endpoint using the display name (used in IDs)
      const response = await fetch(`${ADMIN_API_URL}/${encodeURIComponent(filename)}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
>>>>>>> origin/main
      });

      if (!response.ok) {
        throw new Error(`Deletion failed: ${response.statusText}`);
      }

      // Success: Remove from local store
      localDelete(id);
      return { success: true };
    } catch (err) {
      console.error("Delete error details:", err);
      let message = "Failed to delete document";
      if (err instanceof TypeError && err.message === "Failed to fetch") {
        message = "Connection failed. Check backend and CORS.";
      } else if (err instanceof Error) {
        message = err.message;
      }
      setAdminError(message);
      return { success: false, error: message };
    } finally {
      setIsDeleting(null);
    }
  };

  return {
    documents,
    metrics,
    activeSection,
    isUploading,
    isDeleting,
    adminError,
    handleFileUpload,
    handleDeleteDocument,
    renameDocument,
    addLink: handleAddLink,
    updateLink,
    setActiveSection,
  };
}

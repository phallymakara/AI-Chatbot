const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const documentApi = {
  async uploadDocument(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/documents/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    return response.json();
  },

  async getDocuments() {
    const response = await fetch(`${API_URL}/documents`);
    return response.json();
  },

  async deleteDocument(id) {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: "DELETE",
    });
    return response.json();
  },

  async reIndexDocument(id) {
    const response = await fetch(`${API_URL}/documents/${id}/reindex`, {
      method: "POST",
    });
    return response.json();
  },
};

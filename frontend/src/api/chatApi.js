import { apiClient } from "./client";

export const chatApi = {
  askQuestion: async (question) => {
    const response = await apiClient("/chat", {
      method: "POST",
      body: { question },
    });

    return {
      answer: String(response?.answer ?? ""),
      sources: Array.isArray(response?.sources) ? response.sources : [],
    };
  },
};

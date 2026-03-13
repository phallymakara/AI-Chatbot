import { chatApi } from "./chatApi";

const cleanText = (text) => {
  return String(text ?? "")
    .replace(/undefined/g, "")
    .replace(/null/g, "")
    .trim();
};

export const aiService = {
  async ask(question) {
    const response = await chatApi.askQuestion(question);

    return {
      answer: cleanText(response.answer),
      sources: Array.isArray(response.sources) ? response.sources : [],
    };
  },
};

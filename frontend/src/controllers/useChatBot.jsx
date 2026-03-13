import { useState, useRef, useEffect } from "react";
import { chatApi } from "../api/chatApi";

export const useChatBot = () => {
  const defaultMessage = [
    {
      id: 1,
      type: "bot",
      text: "Hello! How can I assist you today?",
      sources: [],
      isNew: false,
    },
  ];

  /* ---------------- CHAT HISTORY ---------------- */

  const [chats, setChats] = useState(() => {
    const saved = localStorage.getItem("chatSessions");
    return saved ? JSON.parse(saved) : [];
  });

  const [currentChatId, setCurrentChatId] = useState(null);

  /* ---------------- MESSAGES ---------------- */

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");

    if (!saved) return defaultMessage;

    const parsed = JSON.parse(saved);

    return parsed.map((msg) => ({
      ...msg,
      isNew: false,
    }));
  });

  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);

  const abortRef = useRef(null);

  const cleanText = (text) => {
    return String(text ?? "")
      .replace(/undefined/g, "")
      .replace(/null/g, "")
      .trim();
  };

  /* ---------------- SAVE CHAT HISTORY ---------------- */

  useEffect(() => {
    localStorage.setItem("chatSessions", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));

    if (!currentChatId) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId ? { ...chat, messages } : chat,
      ),
    );
  }, [messages]);

  /* ---------------- CREATE NEW CHAT ---------------- */

  const createNewChat = () => {
    // Prevent creating new chat if no conversation yet
    const hasConversation = messages.some((msg) => msg.type === "user");

    if (!hasConversation) return;

    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: defaultMessage,
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages(defaultMessage);
  };

  /* ---------------- LOAD CHAT ---------------- */

  const loadChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (!chat) return;

    setCurrentChatId(chatId);

    const restored = chat.messages.map((msg) => ({
      ...msg,
      isNew: false,
    }));

    setMessages(restored);
  };

  /* ---------------- SEND MESSAGE ---------------- */

  const sendMessage = async (text) => {
    if (!text?.trim()) return;

    setIsStopped(false);

    const userMsg = {
      id: Date.now(),
      type: "user",
      text,
      sources: [],
      isNew: false,
    };

    setMessages((prev) => {
      const updated = [...prev, userMsg];

      /* Create new chat if none exists */

      if (!currentChatId) {
        const newChat = {
          id: Date.now(),
          title: text.slice(0, 40),
          messages: updated,
        };

        setChats((prevChats) => [newChat, ...prevChats]);
        setCurrentChatId(newChat.id);
      }

      return updated;
    });

    setIsTyping(true);

    try {
      const response = await chatApi.askQuestion(text);

      if (isStopped) return;

      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        text: cleanText(response.answer),
        sources: response.sources || [],
        isNew: true,
      };

      setMessages((prev) => [...prev, botMsg]);

      /* Update chat title if still "New Chat" */

      if (currentChatId) {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId && chat.title === "New Chat" ?
              { ...chat, title: text.slice(0, 40) }
            : chat,
          ),
        );
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: "bot",
          text: "Error: Could not connect to the HR server.",
          sources: [],
          isNew: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  /* ---------------- STOP RESPONSE ---------------- */

  const stopAnswer = () => {
    setIsStopped(true);
    abortRef.current?.abort();
    setIsTyping(false);
  };

  /* ---------------- EDIT MESSAGE ---------------- */

  const editMessage = async (id, newText) => {
    if (!newText?.trim()) return;

    setMessages((prev) => {
      const index = prev.findIndex((msg) => msg.id === id);

      if (index === -1) return prev;

      const updated = [...prev];

      updated[index] = {
        ...updated[index],
        text: newText,
      };

      return updated.slice(0, index + 1);
    });

    setIsTyping(true);

    try {
      const response = await chatApi.askQuestion(newText);

      const botMsg = {
        id: Date.now() + 1,
        type: "bot",
        text: cleanText(response.answer),
        sources: response.sources || [],
        isNew: true,
      };

      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return {
    messages,
    sendMessage,
    stopAnswer,
    editMessage,
    isTyping,
    isStopped,
    chats,
    createNewChat,
    loadChat,
  };
};

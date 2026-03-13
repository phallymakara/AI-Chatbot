import React, { useState, useEffect, useRef } from "react";
import { useChatBot } from "../../controllers/useChatBot.jsx";
import { useAuth } from "../../controllers/useAuth.jsx";
import MessageBubble from "./MessageBubble.jsx";

const ChatInterface = () => {
  const {
    messages,
    sendMessage,
    stopAnswer,
    editMessage,
    isTyping,
    isStopped,
    chats,
    createNewChat,
    loadChat,
  } = useChatBot();
  const { logout } = useAuth();
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false); // New State
  const messagesEndRef = useRef(null);
  const [lastUserMessage, setLastUserMessage] = useState(null);

  const chatHistory = chats;

  const scrollToBottom = (instant = false) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: instant ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom(messages.length <= 1);
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const finalMsg = textToSend || input;
    if (!finalMsg.trim()) return;

    setLastUserMessage(finalMsg); // remember last message

    sendMessage(finalMsg);
    setInput("");
  };

  const handleQuickChat = (tagText) => {
    handleSend(tagText);
  };

  return (
    <div className="flex h-screen w-full max-w-5xl mx-auto bg-white shadow-2xl overflow-hidden sm:border-x border-gray-100 relative">
      {/* Logout Confirmation Modal Overlay */}
      {showLogoutConfirm && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-blue-900/10 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 w-full max-w-xs text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Sign Out?</h3>
              <p className="text-gray-500 text-sm mt-1">
                Are you sure you want to end your session?
              </p>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors text-sm">
                Cancel
              </button>
              <button
                onClick={logout}
                className="flex-1 py-2.5 rounded-xl font-bold bg-blue-900 text-white hover:bg-red-600 transition-all text-sm shadow-lg shadow-blue-900/20">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-slate-50 border-r border-gray-100 transition-all duration-300 flex flex-col ${
          isSidebarOpen ? "w-60" : "w-0 overflow-hidden"
        }`}>
        <div className="p-4 border-b bg-white">
          <button
            onClick={createNewChat}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border border-blue-100 text-blue-900 font-semibold text-xs hover:bg-blue-50 transition-all active:scale-95">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Recent History
          </p>
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => loadChat(chat.id)}
              className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-blue-50 hover:text-blue-900 transition-all truncate flex items-center gap-2">
              {chat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <div className="p-4 h-16 border-b flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400 hover:text-blue-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <h2 className="font-bold text-gray-900 text-sm">AI Assistant</h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="hidden sm:block font-medium text-slate-400 text-[11px]">
                Sarah Smith
              </span>
              <img
                src="https://ui-avatars.com/api/?name=Sarah+Smith"
                className="w-8 h-8 rounded-full border border-slate-100"
                alt="profile"
              />
            </div>
            <div className="w-[1px] h-4 bg-slate-200 hidden sm:block"></div>

            {/* Change: Clicking this now shows the modal instead of immediate logout */}
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="p-2 text-slate-400 hover:text-red-600 transition-colors"
              title="Logout">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6 bg-gray-50/20">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onEdit={editMessage}
              isStopped={isStopped}
            />
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-[11px] text-blue-900 font-bold bg-white w-fit px-4 py-2 rounded-xl shadow-sm border border-blue-50 animate-pulse">
              <span className="flex gap-1">
                <span className="w-1 h-1 bg-blue-900 rounded-full"></span>
                <span className="w-1 h-1 bg-blue-900 rounded-full"></span>
                <span className="w-1 h-1 bg-blue-900 rounded-full"></span>
              </span>
              Processing documents...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
            {["Leave Policy", "Sick Leave", "Benefits", "General Inquiry"].map(
              (tag) => (
                <button
                  key={tag}
                  onClick={() => handleQuickChat(tag)}
                  className="text-[10px] border border-blue-100 rounded-full px-3 py-1 text-blue-900 font-bold hover:bg-blue-900 hover:text-white transition-all active:scale-95">
                  {tag}
                </button>
              ),
            )}
          </div>

          <div className="relative flex items-center gap-2">
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }

                if (e.key === "ArrowUp" && !input && lastUserMessage) {
                  e.preventDefault();
                  setInput(lastUserMessage);
                }
              }}
              placeholder="Ask a question..."
              className="flex-1 border border-gray-200 rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm bg-slate-50/30"
            />

            {isTyping ?
              <button
                onClick={stopAnswer}
                className="absolute right-1.5 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all active:scale-90">
                Stop
              </button>
            : <button
                onClick={() => handleSend()}
                className="absolute right-1.5 p-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all active:scale-90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4">
                  <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925a1.5 1.5 0 001.128 1.054l6.12 1.282a.75.75 0 010 1.454l-6.12 1.282a1.5 1.5 0 00-1.128 1.054l-1.414 4.926a.75.75 0 00.95.826l12.865-5.48a1.5 1.5 0 000-2.76L3.105 2.29z" />
                </svg>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;

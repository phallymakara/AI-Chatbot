import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, isTyping, onEdit }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onEdit={onEdit} />
      ))}

      {isTyping && (
        <div className="text-xs text-gray-400 px-2">Assistant is typing...</div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;

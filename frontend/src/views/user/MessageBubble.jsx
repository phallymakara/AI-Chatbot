import React, { useState, useEffect } from "react";

const MessageBubble = ({ message, onEdit, isStopped }) => {
  const isBot = message?.type === "bot";

  const cleanText = (text) => {
    return String(text ?? "")
      .replace(/undefined/g, "")
      .replace(/null/g, "")
      .trim();
  };

  const safeText = cleanText(message?.text);

  const [displayedText, setDisplayedText] = useState(
    message?.isNew ? "" : safeText,
  );

  const [isDoneTyping, setIsDoneTyping] = useState(!message?.isNew);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(message?.text);

  // keep edit input synced
  useEffect(() => {
    setEditedText(message.text);
  }, [message.text]);

  // IMPORTANT: reset typing when message changes
  useEffect(() => {
    setDisplayedText(message?.isNew ? "" : safeText);
    setIsDoneTyping(!message?.isNew);
  }, [message.text]);

  // typing animation
  useEffect(() => {
    if (!isBot || !message?.isNew) return;

    let index = 0;
    let timer;

    const type = () => {
      if (isStopped) {
        clearInterval(timer);
        return;
      }

      if (index < safeText.length) {
        setDisplayedText(safeText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsDoneTyping(true);
      }
    };

    timer = setInterval(type, 5);

    return () => clearInterval(timer);
  }, [safeText, isBot, message?.isNew, isStopped]);

  const [copied, setCopied] = useState(false);

  const copyMessage = () => {
    navigator.clipboard.writeText(message?.text || "");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const saveEdit = () => {
    if (!editedText.trim()) return;

    onEdit?.(message.id, editedText);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-6 px-2`}>
      <div
        className={`group relative max-w-[85%] px-5 py-4 rounded-2xl shadow-sm border ${
          isBot ?
            "bg-white border-slate-100 text-slate-800 rounded-bl-none"
          : "bg-blue-900 text-white rounded-br-none"
        }`}>
        <button
          onClick={copyMessage}
          className="absolute top-2 right-2 text-xs text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition">
          {copied ? "Copied ✓" : "Copy"}
        </button>

        <div className="absolute top-2 right-2 flex gap-2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition">
          {!isBot && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="hover:text-gray-700">
              Edit
            </button>
          )}

          <button onClick={copyMessage} className="hover:text-gray-700">
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>

        <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
          {isEditing ?
            <div className="flex items-center gap-2">
              <input
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="flex-1 border rounded px-2 py-1 text-sm text-black"
                autoFocus
              />

              <button
                onClick={saveEdit}
                className="text-green-600 text-xs font-bold">
                Update
              </button>

              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 text-xs">
                Cancel
              </button>
            </div>
          : <>
              {displayedText}

              {isBot && !isDoneTyping && !isStopped && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-blue-400 animate-pulse align-middle" />
              )}
            </>
          }
        </div>

        {isBot && isDoneTyping && message?.sources?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Sources
            </p>

            <div className="flex flex-wrap gap-2">
              {message.sources.map((src, idx) => {
                if (!src?.document) return null;

                const fileName =
                  decodeURIComponent(src.document.split("/").pop()) ||
                  "Document";

                return (
                  <a
                    key={idx}
                    href={src.document}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-blue-700 text-[11px] font-bold hover:bg-blue-100 transition-colors">
                    📄 {fileName} | Pg. {src.page ?? 1}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import type DataProvider from "../../../data_provider/data_provider";
import { useTheme } from "../../utils/theme";

interface AIChatProps {
  userData: DataProvider;
}

// API Helper
const callRAGAPI = async (message: string): Promise<string | null> => {
  const baseURL = "https://wendiradcom-ai-pitcher.vercel.app";
  
  try {
    let retries = 0;
    const maxRetries = 3;
    while (retries < maxRetries) {
      const response = await fetch(`${baseURL}/api/rag`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message,
          stream: false,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.response || null;
      }

      // Handle error responses
      if (response.status === 400 || response.status === 500) {
        return null;
      }

      const delay = Math.pow(2, retries) * 1000;
      await new Promise((res) => setTimeout(res, delay));
      retries++;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default function AIChat({ userData }: AIChatProps) {
  const { isDark } = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);
  const [loading, setLoading] = useState(false);
  const scrollEnd = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, loading]);

  const handleAsk = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    // Small delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const aiResponse = await callRAGAPI(userMsg);
    setLoading(false);

    if (aiResponse) {
      setMessages((prev) => [...prev, { role: "ai", text: aiResponse }]);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Sorry, something went wrong. Please try again." },
      ]);
    }

    // Focus input after response
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] flex flex-col h-[500px] shadow-xl overflow-hidden border border-secondary-light/30 dark:border-secondary-dark/30">
      {/* Chat Header */}
      <div className="bg-secondary-light/10 dark:bg-secondary-dark/10 px-6 py-4 border-b border-secondary-light/20 dark:border-secondary-dark/20">
        <div className="flex items-center gap-3">
          <img
            src={isDark ? userData.personalInformation.photo.dark : userData.personalInformation.photo.light}
            alt={userData.personalInformation.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-tertiary-light/30 dark:border-tertiary-dark/30"
          />
          <div className="flex-1">
            <h3 className="font-black text-sm text-gray-900 dark:text-gray-100">
              AI Career Strategist
            </h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-[10px] text-secondary-light dark:text-secondary-dark uppercase tracking-wider">
                Online
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-grow overflow-y-auto px-4 py-6 space-y-3 no-scrollbar bg-gray-50/50 dark:bg-gray-900/50">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <img
              src={isDark ? userData.personalInformation.photo.dark : userData.personalInformation.photo.light}
              alt={userData.personalInformation.name}
              className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-tertiary-light/30 dark:border-tertiary-dark/30"
            />
            <p className="text-secondary-light dark:text-secondary-dark text-sm max-w-xs">
              Ask me anything about Wendirad's skills, background, or how he can help your team.
            </p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex items-end gap-2 animate-fade-in ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {m.role === "ai" && (
              <img
                src={isDark ? userData.personalInformation.photo.dark : userData.personalInformation.photo.light}
                alt={userData.personalInformation.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-secondary-light/30 dark:border-secondary-dark/30"
              />
            )}
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                m.role === "user"
                  ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-br-sm"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm border border-secondary-light/20 dark:border-secondary-dark/20 shadow-sm"
              }`}
            >
              <div className={`prose prose-sm max-w-none ${m.role === "user" ? "prose-invert" : "prose-gray dark:prose-invert"}`}>
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-0 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="mb-0 pl-4">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-0 pl-4">{children}</ol>,
                    li: ({ children }) => <li className="mb-1">{children}</li>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  }}
                >
                  {m.text}
                </ReactMarkdown>
              </div>
            </div>
            {m.role === "user" && (
              <img
                src="/imgs/ai_bot.jpg"
                alt="Customer"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-secondary-light/30 dark:border-secondary-dark/30"
              />
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-end gap-2 justify-start animate-fade-in">
            <img
              src={isDark ? userData.personalInformation.photo.dark : userData.personalInformation.photo.light}
              alt={userData.personalInformation.name}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-secondary-light/30 dark:border-secondary-dark/30"
            />
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 border border-secondary-light/20 dark:border-secondary-dark/20 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm text-secondary-light dark:text-secondary-dark font-medium">
                  Typing
                </span>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-secondary-light dark:bg-secondary-dark rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-secondary-light dark:bg-secondary-dark rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-secondary-light dark:bg-secondary-dark rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={scrollEnd} />
      </div>

      {/* Input Bar */}
      <div className="bg-white dark:bg-gray-800 px-4 py-3 border-t border-secondary-light/20 dark:border-secondary-dark/20">
        <form
          onSubmit={handleAsk}
          className="flex items-center gap-2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleAsk(e);
            }
          }}
        >
          <div className="flex-1 bg-secondary-light/10 dark:bg-secondary-dark/10 rounded-full px-4 py-3 flex items-center min-h-[44px]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !loading) {
                  e.preventDefault();
                  handleAsk(e);
                }
              }}
              placeholder={loading ? "Waiting for response..." : "Type a message..."}
              disabled={loading}
              className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-secondary-light dark:placeholder-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            />
          </div>
          <button
            type="button"
            onClick={handleAsk}
            disabled={loading || !input.trim()}
            className={`min-w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
              input.trim() && !loading
                ? "bg-tertiary-light dark:bg-tertiary-dark text-white dark:text-gray-900 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                : "bg-secondary-light/20 dark:bg-secondary-dark/20 text-secondary-light dark:text-secondary-dark cursor-not-allowed"
            }`}
          >
            {loading ? (
              <svg
                className="w-6 h-6 animate-spin text-tertiary-light dark:text-tertiary-dark"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M12 2a10 10 0 100 20V2z"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <defs>
                  <linearGradient id="send-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#98AAFD" />
                    <stop offset="100%" stopColor="#34D8C0" />
                  </linearGradient>
                </defs>
                <path
                  d="M2.01 6.87l13.41-5.37c2.03-.81 3.92 1.08 3.11 3.11l-5.37 13.41c-.73 1.84-3.35 2.04-4.27.31l-2.22-4.08a1 1 0 01.46-1.37l7.17-3.49a.36.36 0 00-.32-.65l-7.21 2.41a2 2 0 01-2.55-2.24l.59-2.04a2 2 0 011.2-1.39z"
                  fill="url(#send-gradient)"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}


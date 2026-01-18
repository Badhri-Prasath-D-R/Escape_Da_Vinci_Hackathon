import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, AlertCircle, CheckCircle, Loader, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import axios from "axios"; 
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

type Message = {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isTyping?: boolean;
  isError?: boolean; 
  verificationData?: {
    status: string; // "True", "Fake", or "Misleading"
    confidence: number;
    sources: string[];
  };
};

const UpgradedChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm CrisisTruth AI, your trusted news verification assistant. I can help you verify news articles, social media posts, images, and claims. Just share what you'd like me to check!",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Pro-Tip #2: Auto-expanding Textarea Logic
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [input]);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setLoading(true);

    const typingMessage: Message = {
      sender: "bot",
      text: "Analyzing with CrisisTruth AI engine...",
      timestamp: new Date(),
      isTyping: true,
    };

    setMessages((prev) => [...prev, typingMessage]);

    try {
      const response = await axios.post(`${API_URL}/verify`, {
        claim: currentInput
      });

      setMessages((prev) => prev.filter((msg) => !msg.isTyping));

      const botMessage: Message = {
        sender: "bot",
        text: response.data.reasoning, 
        timestamp: new Date(),
        verificationData: {
          status: response.data.verdict, // e.g., "True"
          confidence: response.data.scores?.trust_score || 0,
          sources: ["Official Database", "Web Verification"]
        }
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => !msg.isTyping));
      const errorMessage: Message = {
        sender: "bot",
        text: "❌ **Connection Error**: I couldn't reach the verification server. Please ensure the backend is running.",
        timestamp: new Date(),
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={pageContainerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={logoStyle}>✓</div>
          <div>
            <h1 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", margin: 0 }}>CrisisTruth AI</h1>
            <p style={{ fontSize: "12px", color: "#94a3b8", margin: 0, fontWeight: "600" }}>VERIFICATION ENGINE</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={messageListStyle}>
        {messages.map((msg, index) => (
          <div key={index} style={{ display: "flex", justifyContent: msg.sender === "user" ? "flex-end" : "flex-start", animation: "slideUp 0.3s ease-out" }}>
            <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", gap: "6px" }}>
              {msg.sender === "bot" && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingLeft: "4px" }}>
                  <div style={{ ...botAvatarStyle, backgroundColor: msg.isError ? "#ef4444" : "#3b82f6" }}>{msg.isError ? "!" : "✓"}</div>
                  <span style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b" }}>CrisisTruth AI</span>
                </div>
              )}
              
              <div style={{
                ...bubbleStyle,
                backgroundColor: msg.sender === "user" ? "#3b82f6" : "#ffffff",
                color: msg.sender === "user" ? "#ffffff" : "#1f2937",
                borderRadius: msg.sender === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                border: msg.sender === "bot" ? "1px solid #e2e8f0" : "none",
              }}>
                {/* Pro-Tip #1: Dedicated Verdict Label */}
                {msg.verificationData && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    backgroundColor: msg.verificationData.status.toLowerCase().includes('true') ? '#dcfce7' : '#fee2e2',
                    color: msg.verificationData.status.toLowerCase().includes('true') ? '#166534' : '#991b1b',
                    fontWeight: '800',
                    fontSize: '12px',
                    marginBottom: '12px',
                    border: `1px solid ${msg.verificationData.status.toLowerCase().includes('true') ? '#bbf7d0' : '#fecaca'}`
                  }}>
                    {msg.verificationData.status.toLowerCase().includes('true') ? <CheckCircle size={14}/> : <AlertCircle size={14}/>}
                    VERDICT: {msg.verificationData.status.toUpperCase()}
                  </div>
                )}

                {msg.isTyping ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748b" }}>
                    <Loader size={14} className="spin" /> {msg.text}
                  </div>
                ) : (
                  <div className="markdown-container">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}

                {msg.sender === "bot" && !msg.isTyping && !msg.isError && (
                  <div style={actionRowStyle}>
                    <button onClick={() => copyToClipboard(msg.text, index)} style={actionButtonStyle}>
                      <Copy size={12} /> {copiedIndex === index ? "Copied" : "Copy"}
                    </button>
                    <button style={actionButtonStyle}><ThumbsUp size={12} /></button>
                    <button style={actionButtonStyle}><ThumbsDown size={12} /></button>
                  </div>
                )}
              </div>
              <span style={{ fontSize: "11px", color: "#94a3b8", textAlign: msg.sender === "user" ? "right" : "left", padding: "0 6px" }}>
                {formatTime(msg.timestamp)}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={footerStyle}>
        <div style={inputWrapperStyle}>
          <Sparkles size={18} style={{ color: "#94a3b8", marginTop: "12px" }} />
          <textarea
            ref={inputRef}
            placeholder="Paste a news claim here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            rows={1}
            style={textareaStyle}
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} style={{ 
            ...sendButtonStyle, 
            background: loading || !input.trim() ? "#e2e8f0" : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)" 
          }}>
            {loading ? <Loader size={18} className="spin" /> : <Send size={18} />}
          </button>
        </div>
      </div>

      <style>{`
        /* Pro-Tip #3: Beautiful Blockquotes and Markdown Styling */
        .markdown-container blockquote {
          margin: 14px 0;
          padding: 12px 16px;
          background: #f1f5f9;
          border-left: 4px solid #3b82f6;
          color: #334155;
          font-style: italic;
          border-radius: 6px;
          font-size: 13px;
          line-height: 1.5;
        }
        .markdown-container p { margin: 8px 0; }
        .markdown-container strong { color: #1e293b; font-weight: 700; }
        .markdown-container hr { border: none; border-top: 1px solid #e2e8f0; margin: 16px 0; }
        
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

// --- Styles ---
const pageContainerStyle: React.CSSProperties = { display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f8fafc", fontFamily: "'Inter', sans-serif" };
const headerStyle: React.CSSProperties = { background: "#1e293b", padding: "16px 24px", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" };
const logoStyle: React.CSSProperties = { width: "40px", height: "40px", background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "20px", fontWeight: "bold" };
const messageListStyle: React.CSSProperties = { flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: "20px" };
const botAvatarStyle: React.CSSProperties = { width: "24px", height: "24px", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "12px", fontWeight: "bold" };
const bubbleStyle: React.CSSProperties = { padding: "16px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", fontSize: "14px", lineHeight: "1.6" };
const actionRowStyle: React.CSSProperties = { display: "flex", gap: "8px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" };
const actionButtonStyle: React.CSSProperties = { padding: "6px 12px", background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", color: "#64748b", fontSize: "12px", display: "flex", alignItems: "center", gap: "4px" };
const footerStyle: React.CSSProperties = { padding: "20px 24px", backgroundColor: "white", borderTop: "1px solid #e2e8f0" };
const inputWrapperStyle: React.CSSProperties = { display: "flex", gap: "12px", alignItems: "flex-start", maxWidth: "900px", margin: "0 auto", backgroundColor: "#f8fafc", padding: "8px 12px", borderRadius: "16px", border: "2px solid #e2e8f0" };
const textareaStyle: React.CSSProperties = { flex: 1, border: "none", outline: "none", background: "transparent", padding: "12px 0", fontSize: "15px", fontFamily: "inherit", resize: "none", maxHeight: "200px" };
const sendButtonStyle: React.CSSProperties = { padding: "12px", borderRadius: "12px", color: "white", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" };

export default UpgradedChatbotPage;
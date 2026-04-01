"use client";

import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Send, Sparkles, Copy, RefreshCw, ThumbsUp, ThumbsDown, Zap } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FREE_DAILY_LIMIT } from "@/lib/constants";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const STARTER_PROMPTS = [
    { icon: <Sparkles size={16} />, text: "Explain a complex concept simply" },
    { icon: <Zap size={16} />, text: "Help me debug my code" },
    { icon: <RefreshCw size={16} />, text: "Write a professional email" },
    { icon: <Copy size={16} />, text: "Summarize this document" },
];

// Simulated AI response (placeholder until real API is added)
async function* simulateStream(prompt: string): AsyncGenerator<string> {
    const responses: Record<string, string> = {
        default: "I'm NexAI, your intelligent AI assistant. I can help you with writing, research, coding, analysis, and much more. What would you like to explore today?",
    };
    const response = responses[prompt.toLowerCase()] || `That's a great question! Here's what I know about **"${prompt}"**:\n\nThis is a simulated response while the real AI API is being configured. Once connected, I'll provide detailed, accurate, and thoughtful answers to all your questions.\n\n**What I can help with:**\n- Writing & editing\n- Code debugging\n- Research & analysis\n- Creative brainstorming\n- And much more!\n\nYour real AI API will be connected soon. 🚀`;

    const words = response.split(" ");
    for (const word of words) {
        yield word + " ";
        await new Promise(r => setTimeout(r, 25 + Math.random() * 30));
    }
}

export default function ChatPage({ conversationId }: { conversationId?: string }) {
    const { user } = useUser();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [messagesUsed, setMessagesUsed] = useState(3); // mock value
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isNew = !conversationId || conversationId === "new";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (promptOverride?: string) => {
        const prompt = promptOverride || input.trim();
        if (!prompt || isStreaming) return;
        setInput("");

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: prompt,
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, userMsg]);
        setMessagesUsed(p => p + 1);
        setIsStreaming(true);

        const aiMsg: Message = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "",
            timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMsg]);

        try {
            for await (const chunk of simulateStream(prompt)) {
                setMessages(prev =>
                    prev.map(m => m.id === aiMsg.id ? { ...m, content: m.content + chunk } : m)
                );
            }
        } finally {
            setIsStreaming(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const autoResize = () => {
        const ta = textareaRef.current;
        if (ta) { ta.style.height = "auto"; ta.style.height = Math.min(ta.scrollHeight, 180) + "px"; }
    };

    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

    return (
        <div className="chat-container" style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
            {/* Top bar */}
            <div style={{
                padding: "0 1.5rem", height: "52px", flexShrink: 0,
                borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center",
                justifyContent: "space-between",
                background: "var(--surface)",
            }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                    {isNew ? "New conversation" : "Conversation"}
                </span>
                <div style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    fontSize: "0.78rem", color: "var(--text-muted)"
                }}>
                    <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: messagesUsed >= FREE_DAILY_LIMIT ? "var(--error)" : "var(--success)"
                    }} />
                    {messagesUsed}/{FREE_DAILY_LIMIT} messages today
                </div>
            </div>

            {/* Messages or empty state */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
                {messages.length === 0 ? (
                    <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center", paddingTop: "3rem" }}>
                        <div style={{
                            width: 56, height: 56, borderRadius: "16px", margin: "0 auto 1.25rem",
                            background: "linear-gradient(135deg, #7c6af7, #60a5fa)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <Sparkles size={26} color="#fff" />
                        </div>
                        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                            Hi {user?.firstName || "there"}, how can I help?
                        </h2>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "2.5rem" }}>
                            Ask me anything — I&apos;m here to help you think, write, and discover.
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", textAlign: "left" }}>
                            {STARTER_PROMPTS.map(p => (
                                <button key={p.text} onClick={() => handleSend(p.text)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: "0.6rem",
                                        background: "var(--surface-2)", border: "1px solid var(--border)",
                                        borderRadius: "10px", padding: "0.875rem 1rem", cursor: "pointer",
                                        color: "var(--text-secondary)", fontSize: "0.85rem", textAlign: "left",
                                        transition: "all 0.15s",
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget).style.borderColor = "var(--accent)";
                                        (e.currentTarget).style.background = "var(--accent-subtle)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget).style.borderColor = "var(--border)";
                                        (e.currentTarget).style.background = "var(--surface-2)";
                                    }}
                                >
                                    <span style={{ color: "var(--accent)", flexShrink: 0 }}>{p.icon}</span>
                                    {p.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                        {messages.map((msg) => (
                            <div key={msg.id} className="animate-fade-in"
                                style={{ display: "flex", gap: "0.75rem", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                                {msg.role === "assistant" && (
                                    <div style={{
                                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                                        background: "linear-gradient(135deg, #7c6af7, #60a5fa)",
                                        display: "flex", alignItems: "center", justifyContent: "center", marginTop: 2,
                                    }}>
                                        <Sparkles size={14} color="#fff" />
                                    </div>
                                )}
                                <div style={{ maxWidth: "80%", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                                    <div style={{
                                        padding: "0.75rem 1rem",
                                        borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "2px 12px 12px 12px",
                                        background: msg.role === "user" ? "var(--accent)" : "var(--surface-2)",
                                        border: msg.role === "user" ? "none" : "1px solid var(--border)",
                                        color: msg.role === "user" ? "#fff" : "var(--text-primary)",
                                        fontSize: "0.9rem",
                                    }}>
                                        {msg.role === "assistant" ? (
                                            <div className="prose">
                                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                                {isStreaming && msg === messages[messages.length - 1] && !msg.content && (
                                                    <div style={{ display: "flex", gap: "4px", padding: "4px 0" }}>
                                                        <div className="typing-dot" />
                                                        <div className="typing-dot" />
                                                        <div className="typing-dot" />
                                                    </div>
                                                )}
                                            </div>
                                        ) : msg.content}
                                    </div>
                                    {msg.role === "assistant" && msg.content && (
                                        <div style={{ display: "flex", gap: "0.25rem", paddingLeft: "0.25rem" }}>
                                            {[
                                                { icon: <Copy size={12} />, action: () => copyToClipboard(msg.content), title: "Copy" },
                                                { icon: <ThumbsUp size={12} />, action: () => { }, title: "Good response" },
                                                { icon: <ThumbsDown size={12} />, action: () => { }, title: "Bad response" },
                                                { icon: <RefreshCw size={12} />, action: () => handleSend(messages.find(m => m.role === "user" && messages.indexOf(m) === messages.indexOf(msg) - 1)?.content), title: "Regenerate" },
                                            ].map(btn => (
                                                <button key={btn.title} title={btn.title} onClick={btn.action}
                                                    style={{
                                                        background: "none", border: "none", cursor: "pointer",
                                                        color: "var(--text-muted)", padding: "4px 6px", borderRadius: "4px",
                                                        transition: "color 0.15s, background 0.15s",
                                                    }}
                                                    onMouseEnter={e => { (e.currentTarget).style.color = "var(--text-primary)"; (e.currentTarget).style.background = "var(--surface-2)"; }}
                                                    onMouseLeave={e => { (e.currentTarget).style.color = "var(--text-muted)"; (e.currentTarget).style.background = "none"; }}
                                                >
                                                    {btn.icon}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Daily limit warning */}
            {messagesUsed >= FREE_DAILY_LIMIT && (
                <div style={{
                    margin: "0 1.5rem 0.5rem",
                    padding: "0.75rem 1rem",
                    background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)",
                    borderRadius: "8px", fontSize: "0.85rem", color: "var(--error)", textAlign: "center"
                }}>
                    Daily limit reached. <a href="/pricing" style={{ color: "var(--accent)", textDecoration: "underline" }}>Upgrade to Pro</a> for unlimited messages.
                </div>
            )}

            {/* Input area */}
            <div style={{ padding: "0.875rem 1.5rem 1.25rem", flexShrink: 0 }}>
                <div style={{ maxWidth: "720px", margin: "0 auto" }}>
                    <div style={{
                        display: "flex", alignItems: "flex-end", gap: "0.75rem",
                        background: "var(--surface-2)", border: "1px solid var(--border)",
                        borderRadius: "14px", padding: "0.625rem 0.75rem",
                        transition: "border-color 0.2s",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                        onFocusCapture={e => (e.currentTarget).style.borderColor = "var(--accent)"}
                        onBlurCapture={e => (e.currentTarget).style.borderColor = "var(--border)"}
                    >
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={e => { setInput(e.target.value); autoResize(); }}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask NexAI anything..."
                            disabled={isStreaming || messagesUsed >= FREE_DAILY_LIMIT}
                            rows={1}
                            style={{
                                flex: 1, resize: "none", background: "none", border: "none", outline: "none",
                                color: "var(--text-primary)", fontSize: "0.9rem", lineHeight: "1.5",
                                fontFamily: "inherit", maxHeight: "180px", overflowY: "auto",
                                padding: "0.25rem 0",
                            }}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isStreaming || messagesUsed >= FREE_DAILY_LIMIT}
                            style={{
                                background: input.trim() && !isStreaming ? "var(--accent)" : "var(--surface-3)",
                                border: "none", borderRadius: "9px", width: 36, height: 36,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                cursor: (input.trim() && !isStreaming) ? "pointer" : "not-allowed",
                                flexShrink: 0, transition: "all 0.15s",
                            }}
                        >
                            <Send size={15} color={input.trim() && !isStreaming ? "#fff" : "var(--text-muted)"} />
                        </button>
                    </div>
                    <p style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                        NexAI can make mistakes. Verify important information.
                    </p>
                </div>
            </div>
        </div>
    );
}

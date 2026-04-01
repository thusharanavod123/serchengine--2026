"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, UserButton } from "@clerk/nextjs";
import {
    Sparkles, Plus, MessageSquare, Settings, CreditCard,
    ChevronDown, Trash2
} from "lucide-react";

const mockConversations = [
    { id: "1", title: "Quantum entanglement explained", date: "Today" },
    { id: "2", title: "Write a Python web scraper", date: "Today" },
    { id: "3", title: "Marketing strategy for SaaS", date: "Yesterday" },
    { id: "4", title: "Explain blockchain simply", date: "Yesterday" },
    { id: "5", title: "Best practices for React", date: "Last week" },
];

export default function Sidebar() {
    const { user } = useUser();
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

    const groups = [
        { label: "Today", items: mockConversations.filter(c => c.date === "Today") },
        { label: "Yesterday", items: mockConversations.filter(c => c.date === "Yesterday") },
        { label: "Last week", items: mockConversations.filter(c => c.date === "Last week") },
    ];

    return (
        <div className="sidebar">
            {/* Logo */}
            <div style={{ padding: "1rem 0.875rem 0.75rem", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <Sparkles size={18} color="var(--accent)" />
                        <span style={{ fontWeight: 700, fontSize: "1rem" }}>NexAI</span>
                    </div>
                </div>
                <Link href="/chat/new" className="btn btn-primary"
                    style={{ marginTop: "0.875rem", width: "100%", justifyContent: "center", gap: "0.4rem", padding: "0.55rem 1rem" }}>
                    <Plus size={15} /> New Chat
                </Link>
            </div>

            {/* Conversation History */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0.5rem 0" }}>
                {groups.map(group => group.items.length > 0 && (
                    <div key={group.label}>
                        <button
                            onClick={() => setCollapsed(p => ({ ...p, [group.label]: !p[group.label] }))}
                            style={{
                                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "0.3rem 0.875rem", background: "none", border: "none", cursor: "pointer",
                                color: "var(--text-muted)", fontSize: "0.72rem", letterSpacing: "0.06em", textTransform: "uppercase",
                            }}
                        >
                            {group.label}
                            <ChevronDown size={12} style={{ transform: collapsed[group.label] ? "rotate(-90deg)" : "none", transition: "transform 0.2s" }} />
                        </button>
                        {!collapsed[group.label] && group.items.map(conv => (
                            <div key={conv.id} className="animate-slide-in" style={{ position: "relative" }}>
                                <Link href={`/chat/${conv.id}`} style={{ textDecoration: "none" }}>
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: "0.6rem",
                                        padding: "0.5rem 0.875rem", cursor: "pointer",
                                        background: pathname === `/chat/${conv.id}` ? "var(--surface-2)" : "transparent",
                                        borderRadius: "6px", margin: "0 0.375rem",
                                        transition: "background 0.15s",
                                    }}
                                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)"}
                                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = pathname === `/chat/${conv.id}` ? "var(--surface-2)" : "transparent"}
                                    >
                                        <MessageSquare size={13} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                                        <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                                            {conv.title}
                                        </span>
                                        <button style={{
                                            background: "none", border: "none", cursor: "pointer", padding: "2px",
                                            color: "var(--text-muted)", opacity: 0, transition: "opacity 0.15s",
                                            display: "flex",
                                        }}
                                            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--error)"}
                                            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)"}
                                            onClick={e => { e.preventDefault(); }}
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Bottom Nav */}
            <div style={{ borderTop: "1px solid var(--border)", padding: "0.75rem" }}>
                <Link href="/settings" className="btn btn-ghost"
                    style={{ width: "100%", justifyContent: "flex-start", padding: "0.5rem 0.75rem", gap: "0.6rem", marginBottom: "0.25rem" }}>
                    <Settings size={15} /> Settings
                </Link>
                <Link href="/pricing" className="btn btn-ghost"
                    style={{ width: "100%", justifyContent: "flex-start", padding: "0.5rem 0.75rem", gap: "0.6rem", marginBottom: "0.5rem" }}>
                    <CreditCard size={15} /> Upgrade to Pro
                </Link>

                {/* User */}
                <div style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.5rem 0.5rem", borderRadius: "8px",
                    background: "var(--surface-2)", border: "1px solid var(--border)"
                }}>
                    <UserButton />
                    <div style={{ overflow: "hidden", flex: 1 }}>
                        <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user?.fullName || user?.firstName || "User"}
                        </p>
                        <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            Free plan
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

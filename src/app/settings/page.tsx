"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { User, Palette, Bell, Shield, Trash2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

const SECTIONS = [
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "appearance", label: "Appearance", icon: <Palette size={16} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
    { id: "privacy", label: "Privacy & Data", icon: <Shield size={16} /> },
];

export default function SettingsPage() {
    const { user } = useUser();
    const [activeSection, setActiveSection] = useState("profile");

    return (
        <div style={{ minHeight: "100vh", background: "var(--background)", display: "flex" }}>
            {/* Sidebar nav */}
            <div style={{
                width: 220, flexShrink: 0, borderRight: "1px solid var(--border)",
                padding: "1.5rem 0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem"
            }}>
                <Link href="/chat" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", marginBottom: "1.5rem", padding: "0 0.5rem" }}>
                    <Sparkles size={16} color="var(--accent)" />
                    <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>NexAI</span>
                </Link>
                <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", padding: "0 0.5rem", marginBottom: "0.25rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Settings</p>
                {SECTIONS.map(s => (
                    <button key={s.id} onClick={() => setActiveSection(s.id)}
                        style={{
                            display: "flex", alignItems: "center", gap: "0.6rem",
                            padding: "0.55rem 0.75rem", borderRadius: "8px", border: "none",
                            background: activeSection === s.id ? "var(--surface-2)" : "transparent",
                            color: activeSection === s.id ? "var(--text-primary)" : "var(--text-secondary)",
                            cursor: "pointer", width: "100%", fontSize: "0.875rem",
                            transition: "all 0.15s",
                        }}>
                        {s.icon}{s.label}
                        {activeSection === s.id && <ChevronRight size={12} style={{ marginLeft: "auto" }} />}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: "2.5rem 3rem", maxWidth: 720 }}>
                {activeSection === "profile" && (
                    <div>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Profile</h1>
                        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.875rem" }}>Manage your account information.</p>

                        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
                            <UserButton />
                            <div>
                                <p style={{ fontWeight: 600 }}>{user?.fullName || "No name set"}</p>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{user?.primaryEmailAddress?.emailAddress}</p>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {[
                                { label: "Full Name", value: user?.fullName || "" },
                                { label: "Email", value: user?.primaryEmailAddress?.emailAddress || "" },
                            ].map(f => (
                                <div key={f.label}>
                                    <label style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.35rem" }}>{f.label}</label>
                                    <input className="input" value={f.value} readOnly
                                        style={{ opacity: 0.7 }} placeholder={`Your ${f.label.toLowerCase()}`} />
                                </div>
                            ))}
                        </div>

                        <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1rem" }}>
                            To change your name or email, click the avatar above to open your Clerk account settings.
                        </p>
                    </div>
                )}

                {activeSection === "appearance" && (
                    <div>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Appearance</h1>
                        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.875rem" }}>Customize how NexAI looks and feels.</p>
                        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "1.5rem" }}>
                            <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Theme</p>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginBottom: "1rem" }}>Choose your preferred color scheme.</p>
                            <div style={{ display: "flex", gap: "0.75rem" }}>
                                {["Dark", "System"].map(t => (
                                    <button key={t} className="btn btn-outline"
                                        style={{ borderColor: t === "Dark" ? "var(--accent)" : "var(--border)", color: t === "Dark" ? "var(--accent)" : "var(--text-secondary)" }}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === "notifications" && (
                    <div>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Notifications</h1>
                        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.875rem" }}>Manage your email notification preferences.</p>
                        {[
                            { label: "Product updates", desc: "Receive news about new features and improvements" },
                            { label: "Usage alerts", desc: "Get notified when you're approaching your daily limit" },
                            { label: "Weekly digest", desc: "A summary of your AI conversations each week" },
                        ].map(item => (
                            <div key={item.label} style={{
                                display: "flex", justifyContent: "space-between", alignItems: "center",
                                padding: "1rem", background: "var(--surface)", border: "1px solid var(--border)",
                                borderRadius: "10px", marginBottom: "0.75rem"
                            }}>
                                <div>
                                    <p style={{ fontWeight: 500, fontSize: "0.9rem" }}>{item.label}</p>
                                    <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>{item.desc}</p>
                                </div>
                                <div style={{
                                    width: 40, height: 22, borderRadius: "999px", background: "var(--accent)",
                                    cursor: "pointer", position: "relative", flexShrink: 0
                                }}>
                                    <div style={{
                                        width: 16, height: 16, borderRadius: "50%", background: "#fff",
                                        position: "absolute", right: 3, top: 3, transition: "right 0.2s"
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === "privacy" && (
                    <div>
                        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Privacy & Data</h1>
                        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", fontSize: "0.875rem" }}>Control your data and account.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                            <button className="btn btn-outline" style={{ justifyContent: "flex-start", padding: "0.875rem 1rem" }}>
                                Export my data
                            </button>
                            <button className="btn btn-outline" style={{ justifyContent: "flex-start", padding: "0.875rem 1rem", borderColor: "var(--error)", color: "var(--error)" }}>
                                <Trash2 size={15} /> Delete all conversations
                            </button>
                            <button className="btn btn-outline" style={{ justifyContent: "flex-start", padding: "0.875rem 1rem", borderColor: "var(--error)", color: "var(--error)" }}>
                                <Trash2 size={15} /> Delete account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

"use client";

import Link from "next/link";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { PLANS } from "@/lib/constants";

export default function PricingPage() {
    return (
        <div style={{ minHeight: "100vh", background: "var(--background)" }}>
            {/* Nav */}
            <nav className="glass" style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 2rem", height: "60px",
            }}>
                <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
                    <Sparkles size={20} color="var(--accent)" />
                    <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "var(--text-primary)" }}>NexAI</span>
                </Link>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link href="/sign-in" className="btn btn-ghost">Sign In</Link>
                    <Link href="/sign-up" className="btn btn-primary">Get Started <ArrowRight size={14} /></Link>
                </div>
            </nav>

            <div style={{ paddingTop: "8rem", paddingBottom: "5rem", maxWidth: "900px", margin: "0 auto", padding: "8rem 2rem 5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
                    <h1 style={{ fontSize: "2.75rem", fontWeight: 800, marginBottom: "1rem" }}>
                        Simple, <span className="gradient-text">transparent</span> pricing
                    </h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                        Start free, upgrade when you need more power.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                    {/* Free */}
                    <div style={{
                        background: "var(--surface)", border: "1px solid var(--border)",
                        borderRadius: "20px", padding: "2rem",
                    }}>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Free</p>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "3rem", fontWeight: 800 }}>$0</span>
                            <span style={{ color: "var(--text-muted)" }}>/month</span>
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.75rem" }}>
                            Perfect for getting started and exploring NexAI.
                        </p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                            {PLANS.free.features.map(f => (
                                <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                                    <Check size={15} color="var(--success)" style={{ flexShrink: 0 }} />{f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/sign-up" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}>
                            Get started free
                        </Link>
                    </div>

                    {/* Pro */}
                    <div style={{
                        background: "linear-gradient(135deg, rgba(124,106,247,0.08), rgba(96,165,250,0.05))",
                        border: "1px solid var(--accent)",
                        borderRadius: "20px", padding: "2rem", position: "relative",
                    }}>
                        <div style={{
                            position: "absolute", top: "-12px", left: "50%", transform: "translateX(-50%)",
                            background: "var(--accent)", borderRadius: "999px",
                            padding: "0.25rem 1rem", fontSize: "0.75rem", fontWeight: 700, color: "#fff",
                            whiteSpace: "nowrap",
                        }}>MOST POPULAR</div>
                        <p style={{ fontSize: "0.85rem", color: "var(--accent)", marginBottom: "0.25rem" }}>Pro</p>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem", marginBottom: "0.5rem" }}>
                            <span style={{ fontSize: "3rem", fontWeight: 800 }}>${PLANS.pro.price}</span>
                            <span style={{ color: "var(--text-muted)" }}>/month</span>
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1.75rem" }}>
                            For power users who need unlimited access.
                        </p>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "2rem" }}>
                            {PLANS.pro.features.map(f => (
                                <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                                    <Check size={15} color="var(--success)" style={{ flexShrink: 0 }} />{f}
                                </li>
                            ))}
                        </ul>
                        <Link href="/sign-up" className="btn btn-primary glow" style={{ width: "100%", justifyContent: "center", padding: "0.75rem" }}>
                            Upgrade to Pro <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ marginTop: "4rem" }}>
                    <h2 style={{ fontSize: "1.5rem", fontWeight: 700, textAlign: "center", marginBottom: "2rem" }}>Frequently asked questions</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {[
                            { q: "What counts as a message?", a: "Each time you send a prompt to NexAI, that counts as one message. AI responses do not count." },
                            { q: "Can I cancel anytime?", a: "Yes. You can cancel your Pro subscription anytime and you'll retain access until the end of your billing period." },
                            { q: "Is my data private?", a: "Absolutely. We do not train models on your conversations. Your data is encrypted and private." },
                            { q: "What payment methods are accepted?", a: "We accept all major credit cards via Stripe. No crypto or wire transfers at this time." },
                        ].map(item => (
                            <div key={item.q} style={{
                                background: "var(--surface)", border: "1px solid var(--border)",
                                borderRadius: "10px", padding: "1.25rem", cursor: "pointer"
                            }}>
                                <p style={{ fontWeight: 600, marginBottom: "0.35rem", fontSize: "0.9rem" }}>{item.q}</p>
                                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

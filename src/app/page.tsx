"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Zap, Shield, MessageSquare, Sparkles, ChevronRight } from "lucide-react";
import { PLANS } from "@/lib/constants";

export default function LandingPage() {
  const { isSignedIn } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "var(--background)" }}>
      {/* Nav */}
      <nav className="glass" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2rem", height: "60px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Sparkles size={20} color="var(--accent)" />
          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>NexAI</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <Link href="/pricing" className="btn btn-ghost" style={{ fontSize: "0.85rem" }}>Pricing</Link>
          {isSignedIn ? (
            <Link href="/chat" className="btn btn-primary">Go to App <ArrowRight size={14} /></Link>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-ghost">Sign In</Link>
              <Link href="/sign-up" className="btn btn-primary">Get Started <ArrowRight size={14} /></Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "5rem 2rem 3rem",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,106,247,0.12) 0%, transparent 70%)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          background: "var(--accent-subtle)", border: "1px solid rgba(124,106,247,0.25)",
          borderRadius: "999px", padding: "0.35rem 1rem", marginBottom: "2rem",
          fontSize: "0.8rem", color: "var(--accent)",
        }}>
          <Sparkles size={13} /> AI-powered conversations, reimagined
        </div>
        <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.5rem" }}>
          Think deeper with<br />
          <span className="gradient-text">intelligent AI</span>
        </h1>
        <p style={{ maxWidth: "560px", fontSize: "1.1rem", color: "var(--text-secondary)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
          NexAI is your AI assistant that helps you write, research, analyze, and create — with speed and precision that feels like magic.
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/sign-up" className="btn btn-primary glow" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
            Start for free <ArrowRight size={16} />
          </Link>
          <Link href="/sign-in" className="btn btn-outline" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
            Sign in
          </Link>
        </div>
        <p style={{ marginTop: "1.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Free plan · No credit card required
        </p>

        {/* Hero mockup preview */}
        <div style={{
          marginTop: "4rem", width: "100%", maxWidth: "800px",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "16px", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
        }}>
          <div style={{ background: "var(--surface-2)", padding: "0.75rem 1rem", display: "flex", gap: "0.4rem" }}>
            {["#f87171", "#fbbf24", "#34d399"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ marginLeft: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>NexAI Chat</span>
          </div>
          <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", textAlign: "left" }}>
            {/* User message */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{
                background: "var(--accent)", color: "#fff",
                padding: "0.7rem 1rem", borderRadius: "12px 12px 2px 12px",
                maxWidth: "70%", fontSize: "0.9rem"
              }}>
                Explain quantum entanglement in simple terms
              </div>
            </div>
            {/* AI message */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #7c6af7, #60a5fa)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <div style={{
                background: "var(--surface-2)", border: "1px solid var(--border)",
                padding: "0.7rem 1rem", borderRadius: "2px 12px 12px 12px",
                maxWidth: "80%", fontSize: "0.9rem", color: "var(--text-secondary)"
              }}>
                Quantum entanglement is like having two magical coins — when you flip one and it lands heads, the other <em>instantly</em> lands tails, no matter how far apart they are. Einstein called it &quot;spooky action at a distance&quot;...
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "5rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>
          Everything you need to think better
        </h2>
        <p style={{ textAlign: "center", color: "var(--text-secondary)", marginBottom: "3rem" }}>
          Built for creators, researchers, developers, and curious minds.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {[
            { icon: <MessageSquare size={22} />, title: "Natural Conversations", desc: "Chat fluently with an AI that understands context, nuance, and follow-up questions." },
            { icon: <Zap size={22} />, title: "Lightning Fast", desc: "Get responses in seconds. No waiting, no lag — just instant intelligent answers." },
            { icon: <Shield size={22} />, title: "Private & Secure", desc: "Your conversations are yours. We never train on your data without consent." },
            { icon: <Sparkles size={22} />, title: "Smart Memory", desc: "NexAI remembers your conversations so context carries across sessions." },
          ].map(f => (
            <div key={f.title} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: "12px", padding: "1.5rem",
              transition: "border-color 0.2s, transform 0.2s",
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <div style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>{f.icon}</div>
              <h3 style={{ fontWeight: 600, marginBottom: "0.4rem" }}>{f.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Preview */}
      <section style={{ padding: "5rem 2rem", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.75rem" }}>Simple, honest pricing</h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "3rem" }}>Start free. Upgrade when you need more.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {/* Free */}
            <div style={{
              background: "var(--surface-2)", border: "1px solid var(--border)",
              borderRadius: "16px", padding: "2rem", textAlign: "left"
            }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Free</p>
              <p style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>$0<span style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {PLANS.free.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <ChevronRight size={14} color="var(--success)" style={{ flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="btn btn-outline" style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center" }}>Get started free</Link>
            </div>
            {/* Pro */}
            <div style={{
              background: "var(--accent-subtle)", border: "1px solid var(--accent)",
              borderRadius: "16px", padding: "2rem", textAlign: "left", position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", top: "1rem", right: "1rem",
                background: "var(--accent)", borderRadius: "999px",
                padding: "0.2rem 0.6rem", fontSize: "0.7rem", fontWeight: 600, color: "#fff"
              }}>POPULAR</div>
              <p style={{ color: "var(--accent)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>Pro</p>
              <p style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>${PLANS.pro.price}<span style={{ fontSize: "1rem", fontWeight: 400, color: "var(--text-muted)" }}>/mo</span></p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {PLANS.pro.features.map(f => (
                  <li key={f} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                    <ChevronRight size={14} color="var(--success)" style={{ flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="btn btn-primary glow" style={{ marginTop: "1.5rem", width: "100%", justifyContent: "center" }}>
                Upgrade to Pro <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "2rem", textAlign: "center",
        color: "var(--text-muted)", fontSize: "0.8rem",
        borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap"
      }}>
        <span>© 2026 NexAI. All rights reserved.</span>
        <Link href="/pricing" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Pricing</Link>
        <Link href="/sign-in" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Sign In</Link>
        <Link href="/sign-up" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Sign Up</Link>
      </footer>
    </div>
  );
}

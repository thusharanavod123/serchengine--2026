import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div style={{
            minHeight: "100vh", background: "var(--background)",
            display: "flex", alignItems: "center", justifyContent: "center",
            backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(124,106,247,0.1) 0%, transparent 70%)",
        }}>
            <SignUp
                appearance={{
                    variables: {
                        colorPrimary: "#7c6af7",
                        colorBackground: "#111118",
                        colorText: "#f0f0f8",
                        colorTextSecondary: "#9090a8",
                        colorInputBackground: "#1a1a24",
                        colorInputText: "#f0f0f8",
                        borderRadius: "10px",
                    },
                    elements: {
                        card: { boxShadow: "0 24px 60px rgba(0,0,0,0.5)", border: "1px solid #2a2a3a" },
                        headerTitle: { color: "#f0f0f8" },
                    }
                }}
            />
        </div>
    );
}

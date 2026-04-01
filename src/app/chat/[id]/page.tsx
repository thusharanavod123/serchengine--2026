import ChatInterface from "@/components/ChatInterface";

export default function ConversationPage({ params }: { params: { id: string } }) {
    return <ChatInterface conversationId={params.id} />;
}

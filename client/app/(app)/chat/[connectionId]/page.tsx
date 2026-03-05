import { ChatView } from "@/components/chat/ChatView";

interface ChatPageProps {
  params: Promise<{ connectionId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { connectionId } = await params;
  return <ChatView connectionId={connectionId} />;
}

import { Chat } from "@/components/chat";
import { getMessages } from "@/app/actions";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const messages = await getMessages(id);

  return (
    <div className="container mx-auto p-4">
      <Chat initialMessages={messages} />
    </div>
  );
}

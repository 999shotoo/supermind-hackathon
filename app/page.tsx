import React from "react";
import { redirect } from "next/navigation";
import { addMessage, createChat } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const message = formData.get("message") as string;
    if (!message) return;

    const chat = await createChat(message);

    const requestBody = {
      input_value: message,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-GZx5K": {},
        "ChatOutput-gPkNh": {},
        "Agent-T8fIY": {},
        "Prompt-xBIRN": {},
        "AstraDB-Eqgxi": {},
        "ParseData-ZA9oM": {},
        "File-soIAy": {},
        "AstraDB-LdUYD": {},
        "SplitText-YojhN": {},
        "NVIDIAEmbeddingsComponent-ROpt8": {},
        "NVIDIAEmbeddingsComponent-pSKAR": {},
      },
    };

    const response = await fetch(process.env.LANGFLOW_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LANGFLOW_API_KEY!}`,
      },
      body: JSON.stringify(requestBody),
    });

    // Check if the response is ok
    if (!response.ok) {
      throw new Error("Failed to generate response");
    }

    // Return the response from the Langflow API
    const data = await response.json();

    console.log(data);

    addMessage(
      chat.id,
      data.outputs[0].outputs[0].results.message.text,
      "assistant"
    );
    redirect(`/chat/${chat.id}`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center ">Start a New Chat</h1>
        <form action={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="message"
            placeholder="Type your message here..."
            required
          />
          <Button type="submit" className="w-full">
            Start Chat
          </Button>
        </form>
      </div>
    </div>
  );
}

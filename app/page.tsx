import React from "react";
import { redirect } from "next/navigation";
import { createChat } from "./actions";


export default function Page() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const message = formData.get("message") as string;
    if (!message) return;

    const chat = await createChat(message);
    redirect(`/chat/${chat.id}`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Start a New Chat
        </h1>
        <form action={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="message"
            placeholder="Type your message here..."
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Start Chat
          </button>
        </form>
      </div>
    </div>
  );
}

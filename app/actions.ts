"use server";

import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createChat(message: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const chat = await prisma.chat.create({
    data: {
      title: message.slice(0, 50),
      userId: userId,
      messages: {
        create: {
          content: message,
          role: "user",
        },
      },
    },
  });

  return chat;
}

export async function getMessages(chatId: string) {
  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
  });

  return messages;
}

export async function addMessage(
  chatId: string,
  content: string,
  role: "user" | "assistant"
) {
  const message = await prisma.message.create({
    data: {
      content,
      role,
      chatId,
    },
  });

  return message;
}

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const prisma = new PrismaClient();

// Menu items.
export async function AppSidebar() {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return (
    <Sidebar>
      <SidebarContent>
        <h1 className="text-2xl font-semibold p-4 border-b">Chats</h1>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-4">
                <Button className="w-full">+ Start New Chat</Button>
              </SidebarMenuItem>
              {chats.map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={`/chat/${chat.id}`}>
                      <span>{chat.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Chat #69",
    url: "#",
  },
  {
    title: "Chat #69",
    url: "#",
  },
  {
    title: "Chat #69",
    url: "#",
  },
  {
    title: "Chat #69",
    url: "#",
  },
  {
    title: "Chat #69",
    url: "#",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <h1 className="text-2xl font-semibold p-4 border-b">Chats</h1>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
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

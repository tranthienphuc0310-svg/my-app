"use client";

import { Globe, User, Settings } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "language",
    url: "/languagepage",
    icon: Globe,
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();
  const router = useRouter(); // Dùng router để chuyển trang khi click

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2 font-semibold">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Account Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    isActive={pathname === item.url}
                    onClick={() => router.push(item.url)} // Chuyển trang trực tiếp khi bấm
                    className="w-full justify-start cursor-pointer data-[active=true]:bg-accent"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
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

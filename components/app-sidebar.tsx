"use client";

import type * as React from "react";
import {
  AppWindow,
  BookOpen,
  Bot,
  Command,
  GraduationCap,
  School,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { User } from "@/lib/types";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/ApplicationManager/dashboard",
      icon: AppWindow,
    },
    {
      title: "Universities",
      url: "/ApplicationManager/universities",
      icon: School,
    },
    {
      title: "Documents",
      url: "/ApplicationManager/documents",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoaded } = useUser();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const getCurrentUser = useQuery(
    api.user.getCurrentUser,
    isLoaded && user ? { clerkId: user.id } : "skip",
  );
  useEffect(() => {
    if (getCurrentUser) {
      setCurrentUser(getCurrentUser);
    }
  }, [getCurrentUser]);

  const universities = useQuery(
    api.universities.getByUserId,
    currentUser ? { userId: currentUser.clerkId } : "skip",
  );
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/" className="flex items-center gap-3">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GraduationCap />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">TrackAdmit</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects universities={universities ?? []} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

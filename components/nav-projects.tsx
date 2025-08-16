"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link2 } from "lucide-react";
import Link from "next/link";

export function NavProjects({
  universities,
}: {
  universities: {
    name: string;
    slug: string;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Universities</SidebarGroupLabel>
      <SidebarMenu>
        {universities.slice(0, 4).map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={`${item.slug}`}>
                <Link2 />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href="/ApplicationManager/universities">
              <span className="text-muted-foreground">
                View all universities +
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

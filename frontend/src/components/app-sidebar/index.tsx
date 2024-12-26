"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import { ExtendedUser } from "@/auth";

export const AppSidebar = () => {
  const currentUser = useCurrentUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser as ExtendedUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

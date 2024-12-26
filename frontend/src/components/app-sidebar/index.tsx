"use client";

import { type ExtendedUser } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { pageRoutes } from "@/lib/routes";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/app-sidebar/nav-user";
import { NavMain } from "@/components/app-sidebar/nav-main";

export const AppSidebar = () => {
  const currentUser = useCurrentUser();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader />
      <NavMain items={pageRoutes} />
      <SidebarFooter>
        <NavUser user={currentUser as ExtendedUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

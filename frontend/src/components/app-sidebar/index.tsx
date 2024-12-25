"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { logout } from "@/actions/logout";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LogOut } from "lucide-react";

export const AppSidebar = () => {
  const currentUser = useCurrentUser();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-12" asChild>
                <SidebarMenuButton className="">
                  <Avatar>
                    <AvatarImage
                      src={currentUser?.image || "/images/placeholder.jpg"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="w-full font-semibold text-gray-500 hover:text-black hover:bg-gray-100">
                    {currentUser?.name}
                  </span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <div
                    className="flex items-center justify-left gap-x-3 w-full"
                    onClick={() => logout()}
                  >
                    <span>Sign out</span>
                    <LogOut />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

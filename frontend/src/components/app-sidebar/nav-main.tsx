"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronRight } from "lucide-react";

import { Icon } from "@/components/icon";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { PageRoute } from "@/lib/routes";

interface NavMainProps {
  items: PageRoute[];
}

export const NavMain = ({ items }: NavMainProps) => {
  const pathname = usePathname();

  return (
    <SidebarContent className="overflow-hidden">
      {items.map((route, key) => (
        <SidebarGroup key={key}>
          <SidebarGroupLabel>{route.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {route.items.map((item, key) => (
                <SidebarMenuItem key={key}>
                  {item.items?.length ? (
                    <Collapsible className="group/collapsible">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title}>
                          {item.icon && (
                            <Icon name={item.icon} className="size-4" />
                          )}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem, key) => (
                            <SidebarMenuSubItem key={key}>
                              <SidebarMenuSubButton
                                isActive={pathname === subItem.href}
                                asChild
                              >
                                <Link
                                  href={subItem.href}
                                  target={subItem.newTab ? "_blank" : ""}
                                >
                                  {subItem.icon && (
                                    <Icon
                                      name={subItem.icon}
                                      className="size-4"
                                    />
                                  )}
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.href}
                    >
                      <Link
                        href={item.href}
                        target={item.newTab ? "_blank" : ""}
                      >
                        {item.icon && (
                          <Icon name={item.icon} className="size-4" />
                        )}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  )}
                  {item.isComing ? (
                    <SidebarMenuBadge className="opacity-50">
                      Coming
                    </SidebarMenuBadge>
                  ) : null}
                  {item.isNew ? (
                    <SidebarMenuBadge className="text-green-500 dark:text-green-200">
                      New
                    </SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
};

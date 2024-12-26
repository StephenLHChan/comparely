import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <div className="w-full">
            <SidebarTrigger />
            <main className="min-h-full p-4 lg:container lg:pt-10">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default ProtectedLayout;

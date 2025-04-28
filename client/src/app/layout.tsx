import "./globals.css";

import { cookies, headers } from "next/headers";

import { Barcode, LayoutDashboard, Package2 } from "lucide-react";
import { Sidebar, SidebarItem } from "@/shared/Sidebar";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { ToastProvider } from "@/lib/contexts/ToastContext";
import { ContentProvider } from "@/lib/contexts/ContentContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = headers().get("x-url");
  const user = JSON.parse(headers().get("x-user")!);

  const sidebarState = cookies().get("sidebar-state")?.value;

  const localSettings = {
    sidebarState,
  };

  return (
    <html lang="en">
      <body className={`h-screen w-screen overflow-hidden flex`}>
        {user ? (
          <ContentProvider localSettings={localSettings} user={user}>
            {children}
          </ContentProvider>
        ) : (
          <AuthProvider>{children}</AuthProvider>
        )}
      </body>
    </html>
  );
}

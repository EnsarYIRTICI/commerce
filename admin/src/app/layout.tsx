import "./globals.css";

import { headers } from "next/headers";

import { Barcode, LayoutDashboard, Package2 } from "lucide-react";
import { Sidebar, SidebarItem } from "@/components/Sidebar";
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
  const userDataStr = headers().get("x-user");
  const user = JSON.parse(userDataStr!);

  return user ? (
    <ContentProvider user={user}>{children}</ContentProvider>
  ) : (
    <AuthProvider>{children}</AuthProvider>
  );
}

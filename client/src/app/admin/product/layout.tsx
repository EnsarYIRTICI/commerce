import React from "react";

import { ToastProvider } from "@/lib/contexts/ToastContext";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { Sidebar, SidebarItem } from "@/app/admin/components/Sidebar";
import { sidebarNodes } from "@/app/admin/nodes/sidebar.node";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`h-screen w-screen overflow-hidden flex`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

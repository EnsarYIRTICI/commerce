import React from "react";

import { ToastProvider } from "@/lib/contexts/ToastContext";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { Sidebar, SidebarItem } from "@/components/Sidebar";
import { sidebarNodes } from "@/nodes/sidebar.node";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`h-screen w-screen overflow-hidden flex`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

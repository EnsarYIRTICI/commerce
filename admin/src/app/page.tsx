"use client";

import { Sidebar, SidebarItem } from "@/components/Sidebar";
import { useContent } from "@/lib/contexts/ContentContext";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { sidebarNodes } from "@/nodes/sidebar.node";

export default function page() {
  return (
    <html lang="en">
      <body className={`h-screen w-screen overflow-hidden flex`}>
        <SidebarProvider>
          <Sidebar>
            {sidebarNodes.map((node) => (
              <SidebarItem
                key={node.key}
                text={node.text}
                icon={node.icon}
                path={node.path}
              />
            ))}
          </Sidebar>
        </SidebarProvider>

        <div className="flex-1 flex flex-col overflow-hidden px-7">
          <div className="my-5 w-full flex justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
          </div>
        </div>
      </body>
    </html>
  );
}

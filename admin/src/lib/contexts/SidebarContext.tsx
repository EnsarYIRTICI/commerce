"use client";

import { useContext, createContext, ReactNode, useState } from "react";
import { useContent } from "./ContentContext";

export interface SidebarContextProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SideBarContext = createContext<SidebarContextProps | null>(null);

export function SidebarProvider({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const { localSettings } = useContent();

  const [expanded, setExpanded] = useState(
    localSettings.sidebarState === "enabled" ? true : false
  );

  return (
    <SideBarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SideBarContext.Provider>
  );
}

export function useSidebarContext(): SidebarContextProps {
  const context = useContext(SideBarContext);

  if (!context) {
    throw new Error("useSidebarContext must be used within a SideBarProvider");
  }

  const { expanded, setExpanded } = context;

  return { expanded, setExpanded };
}

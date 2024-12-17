"use client";

import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { AuthContextValue, useAuth } from "@/lib/contexts/AuthContext";
import { navigate } from "@/lib/utils/navigateUtils";
import {
  SidebarProvider,
  useSidebarContext,
} from "@/lib/contexts/SidebarContext";
import { changeSidebar, getSidebar } from "@/lib/utils/preferenceUtils";
import { useContent } from "@/lib/contexts/ContentContext";

function Sidebar({
  children,
}: Readonly<{
  children?: ReactNode;
}>) {
  const { user } = useContent();
  const { expanded, setExpanded } = useSidebarContext();

  const _changeSidebar = () => {
    if (changeSidebar() === "enabled") {
      setExpanded(true);

      return;
    }

    setExpanded(false);
  };

  const _getSidebar = () => {
    if (getSidebar() === "enabled") {
      setExpanded(true);

      return;
    }

    setExpanded(false);
  };

  useEffect(() => {
    _getSidebar();
  }, []);

  return (
    <aside className="h-screen md:block hidden">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <span
            className={`whitespace-nowrap overflow-hidden transition-all ${
              expanded ? "w-52" : "w-0"
            }`}
          >
            <h3>Commerce App</h3>
          </span>

          <button
            onClick={_changeSidebar}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <div className="border-t flex p-3">
          <div className="w-10 h-10 rounded-md border border-slate-300 flex items-center justify-center">
            <h1>
              {user?.name.substring(0, 1)}
              {user?.lastname.substring(0, 1)}
            </h1>
          </div>

          <div
            className={`flex items-center justify-between transition-all overflow-hidden text-slate-500 ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4>
                {user?.name} {user?.lastname}
              </h4>
              <span className="text-xs">{user?.email}</span>
            </div>

            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({
  icon,
  text,
  path,
  isAlert,
}: Readonly<{
  icon: ReactNode;
  text: string;
  path: string;
  isAlert?: boolean;
}>) {
  const pathname = usePathname();

  const { expanded } = useSidebarContext();

  return (
    <li
      onClick={() => navigate(path)}
      className={`
        relative flex items-center py-2 px-3 my-1 
        font-medium rounded-md cursor-pointer 
        transition-colors group
        ${
          path === "/" + pathname.split("/")[1]
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all whitespace-nowrap  ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {isAlert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            z-10 absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export { SidebarItem, Sidebar };

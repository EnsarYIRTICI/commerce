import React, { useEffect, useRef, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";

export function Dropdown({
  className,
  name,
  parentValue,
  parentPrevValue,
  items,
  placeholder,
  value,
  disabled,
  onSelect,
}: Readonly<{
  className?: string;
  name: string;
  parentValue?: any;
  parentPrevValue?: any;
  items: any[] | undefined;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onSelect: (name: string, item: any, index: number, parentValue: any) => void;
}>) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parentValue !== parentPrevValue) {
      onSelect(name, null, 0, parentValue);
    }
  }, [items]);

  useEffect(() => {
    function _onMousedown(e: MouseEvent) {
      if (dropdownRef.current && e.target instanceof Node) {
        if (dropdownRef.current.contains(e.target)) {
          return;
        }

        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", _onMousedown);
    } else {
      document.removeEventListener("mousedown", _onMousedown);
    }

    return () => {
      document.removeEventListener("mousedown", _onMousedown);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="dropdown ">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex-nowrap flex btn m-1 w-52 justify-between ${className} `}
      >
        {value ? (
          <span className="text-zinc-500 truncate whitespace-nowrap overflow-hidden">
            {value}
          </span>
        ) : (
          <span className="text-zinc-400 truncate whitespace-nowrap overflow-hidden">
            {placeholder}
          </span>
        )}
        <ChevronDownIcon className="size-4 fill-white/60" />
      </div>

      <ul
        className={`absolute z-[1]
        ${isOpen ? "" : "dropdown-content"}
         bg-base-100 rounded-box m-1 w-52 p-2 shadow 
         overflow-y-scroll overflow-x-hidden max-h-[10rem] flex flex-col
        `}
      >
        {items?.map((item: any, i) => (
          <li
            key={i}
            onClick={() => {
              setIsOpen(false);
              onSelect(name, item, i, parentValue);
            }}
            className="w-full py-1.5 px-3 cursor-pointer hover:bg-gray-100 rounded-lg text-zinc-500"
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

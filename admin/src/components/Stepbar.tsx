"use client";

import { useProductCreate } from "@/lib/contexts/ProductCreateContext";
import { Check } from "lucide-react";
import { ReactNode } from "react";

export const Stepbar = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <nav className="w-96 mt-28 hidden md:block">
      <ul className="space-y-6">{children}</ul>
    </nav>
  );
};

export const StepbarItem = ({
  text,
  index,
}: Readonly<{ text: string; index: number }>) => {
  const { step } = useProductCreate();

  const isActive = index + 1 === step;
  const isPassed = index + 1 < step;

  return (
    <li className="w-full flex items-center space-x-4">
      <div className="w-4/12 flex justify-end">
        {isPassed ? (
          <Check size={18} className="text-green-600" />
        ) : (
          <div
            className={`rounded-md flex-shrink-0
    ${isActive ? "bg-indigo-600 h-1 w-10 " : "bg-gray-400 h-0.5 w-5 "}`}
          />
        )}
      </div>
      <div className="flex-1 flex justify-start">
        <span
          className={`w-full  ${
            isActive
              ? "text-indigo-600 text-sm"
              : isPassed
              ? "text-green-600 text-sm"
              : "text-gray-400 text-xs"
          }`}
        >
          {text}
        </span>
      </div>
    </li>
  );
};

"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import Toast from "@/components/Toast";
import { v4 as uuidv4 } from "uuid";
import { ToastType } from "../enum/toast_type.enum";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  addToast: (message: string, type: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastProps[] | null>(null);

  const addToast = (message: string, type: ToastType, duration = 3000) => {
    const id = uuidv4();
    setToasts((prev) => [...(prev || []), { id, message, type }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => (prev ? prev.filter((toast) => toast.id !== id) : []));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="absolute top-0 right-0 z-10 p-4 space-y-2">
        {toasts?.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

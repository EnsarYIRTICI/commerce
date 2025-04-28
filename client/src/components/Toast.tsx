import React, { useEffect, useState } from "react";
import { Check, Info, X } from "lucide-react";
import { ToastType } from "@/lib/enum/toast_type.enum";

const Toast = ({ message, type }: { message: string; type: ToastType }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 2700);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`m-2 flex flex-col px-4 py-4 max-w-[20rem] md:max-w-[30rem] shadow-xl rounded-md text-white 
        transition-all duration-300 transform overflow-hidden
        ${visible ? "opacity-100" : "opacity-0"}
        
        ${
          type === ToastType.ERROR
            ? "bg-pink-600"
            : type === ToastType.SUCCESS
            ? "bg-emerald-400"
            : "bg-gray-500"
        }`}
      role="alert"
    >
      <div className="flex items-center mb-2">
        {type === ToastType.ERROR ? (
          <X size={20} />
        ) : type === ToastType.SUCCESS ? (
          <Check size={20} />
        ) : (
          <Info size={20} />
        )}

        <span className="ml-2">
          {type === ToastType.ERROR
            ? "Error"
            : type === ToastType.SUCCESS
            ? "Success"
            : "Info"}
        </span>
      </div>
      <div className="flex">
        <div className="truncate whitespace-nowrap text-sm">
          <span className="font-bold">{message}</span>
        </div>
        <button className="ml-4 text-gray shadow-2xl"></button>
      </div>
    </div>
  );
};

export default Toast;

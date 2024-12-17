"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { IUser } from "../types/IUser";

export interface ContentContextValue {
  user: IUser;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const ContentContext = createContext<ContentContextValue | null>(null);

export const ContentProvider = ({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: IUser;
}>) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ContentContext.Provider
      value={{
        user: user,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = (): ContentContextValue => {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useContent must be used within a ContentProvider");
  }

  return context;
};

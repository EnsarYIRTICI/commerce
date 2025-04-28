"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { findCategoryTree } from "@/lib/services/category.service";
import { ICategory, IProductAttribute } from "../types/IProduct";

interface ProductCreateContextType {
  categories: ICategory[];
  product_attributes: IProductAttribute[];
  step: number;
  loading: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCreateContext = createContext<
  ProductCreateContextType | undefined
>(undefined);

export const ProductCreateProvider = ({
  categories,
  product_attributes,
  children,
}: {
  categories: ICategory[];
  product_attributes: IProductAttribute[];
  children: ReactNode;
}) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <ProductCreateContext.Provider
      value={{
        categories,
        product_attributes,
        step,
        loading,
        setStep,
        setLoading,
      }}
    >
      {children}
    </ProductCreateContext.Provider>
  );
};

export const useProductCreate = () => {
  const context = useContext(ProductCreateContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

import { ProductSidebar, ProductSidebarItem } from "@/components/Stepbar";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ProductCreateProvider } from "@/lib/contexts/ProductCreateContext";
import { findCategoryTree } from "@/lib/services/category.service";
import { findValues } from "@/lib/services/product_attribute.service";
import { getPathname, getToken } from "@/lib/utils/headerUtils";
import { headers } from "next/headers";
import { ReactNode } from "react";

export default async function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = getPathname(headers);
  const token = getToken(headers);

  const categories = await findCategoryTree(token!);
  const product_attributes = await findValues(token!);

  return token && pathname && categories && product_attributes ? (
    <ProductCreateProvider
      categories={categories}
      product_attributes={product_attributes}
    >
      {children}
    </ProductCreateProvider>
  ) : (
    <h1>404</h1>
  );
}

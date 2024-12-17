import { AuthProvider } from "@/lib/contexts/AuthContext";
import { ProductCreateProvider } from "@/lib/contexts/ProductCreateContext";
import { findCategories } from "@/lib/services/category.service";
import { findValues } from "@/lib/services/product_attribute.service";
import { headers, cookies } from "next/headers";
import { ReactNode } from "react";

export default async function layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  let categories;
  let product_attributes;

  try {
    categories = await findCategories(token!);
    product_attributes = await findValues(token!);
  } catch (error) {
    console.log(error);
  }

  return categories && product_attributes ? (
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

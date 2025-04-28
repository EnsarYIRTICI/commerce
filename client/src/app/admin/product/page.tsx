"use client";

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { IoAdd } from "react-icons/io5";
import { Search } from "lucide-react";

import {
  navigateProductCreatePage,
  navigateProductDetail,
} from "@/lib/utils/navigateUtils";
import { findProducts } from "@/lib/services/product.service";
import { useAuth } from "@/lib/contexts/AuthContext";
import { ToastProvider, useToast } from "@/lib/contexts/ToastContext";
import { IProduct, IProductImage, IProductVariant } from "@/lib/types/IProduct";
import { ImageSize } from "@/lib/enum/image_size.enum";
import { ToastType } from "@/lib/enum/toast_type.enum";
import { useContent } from "@/lib/contexts/ContentContext";
import Thumbnail from "@/components/Thumbnail";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { Sidebar, SidebarItem } from "@/shared/Sidebar";
import { sidebarNodes } from "@/nodes/sidebar.node";

export default function page() {
  const { addToast } = useToast();
  const { isLoading, setIsLoading } = useContent();

  const [products, setProducts] = useState([]);

  const _findProducts = async () => {
    try {
      setIsLoading(true);

      const data = await findProducts();
      setProducts(data);
    } catch (error: any) {
      console.error(error);

      errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const errorToast = (message: string) => {
    addToast(message, ToastType.ERROR, 3000);
  };

  useEffect(() => {
    _findProducts();
  }, []);

  const skeletonArray = Array(10).fill(null);

  return (
    <>
      <SidebarProvider>
        <Sidebar>
          {sidebarNodes.map((node) => (
            <SidebarItem
              key={node.key}
              text={node.text}
              icon={node.icon}
              path={node.path}
            />
          ))}
        </Sidebar>
      </SidebarProvider>

      <div className="flex-1 flex flex-col overflow-hidden px-7">
        <div className="my-5 w-full flex justify-between">
          <h1 className="text-3xl font-bold">Products</h1>

          <button
            onClick={navigateProductCreatePage}
            className="btn btn-outline btn-md"
          >
            <IoAdd className="mr-2" size={20} />
            <span>Create Product</span>
          </button>
        </div>

        <div className="my-5 flex">
          <label className="input input-bordered  flex items-center gap-10 max-w-xs">
            <input type="text" className="grow" placeholder="Search" />
            <Search size={20} />
          </label>
        </div>

        {isLoading ? (
          <div className="w-full flex-1 overflow-hidden">
            {/* <div className="skeleton w-full h-full"></div> */}
            {skeletonArray.map((_, index) => (
              <div key={index} className="skeleton w-full h-[5rem] mb-3"></div>
            ))}
          </div>
        ) : (
          <div className="w-full flex-1 overflow-x-scroll overflow-y-scroll">
            <table className="table table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th>NUMBER</th>
                  <th>NAME</th>
                  <th>IMAGES</th>
                  <th>DESCRIPTION</th>
                  <th>CATEGORY</th>
                  <th>TOTAL SALES</th>
                  <th>TOTAL REVENUE</th>
                  <th>CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product: IProduct, index: number) => (
                  <Product
                    key={product.id}
                    product={product}
                    index={index}
                    onClick={() => {
                      navigateProductDetail(product.slug);
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {isLoading ? (
          <div className="skeleton join my-5 mx-auto">
            <button className="join-item btn"></button>
            <button className="join-item btn"></button>
            <button className="join-item btn"></button>
            <button className="join-item btn"></button>
            <button className="join-item btn"></button>
          </div>
        ) : (
          <div className="join my-5 mx-auto">
            <button className="join-item btn">1</button>
            <button className="join-item btn">2</button>
            <button className="join-item btn btn-disabled">...</button>
            <button className="join-item btn">99</button>
            <button className="join-item btn">100</button>
          </div>
        )}
      </div>
    </>
  );
}

const Product = ({
  product,
  index,
  onClick,
}: {
  product: IProduct;
  index: number;
  onClick: () => void;
}) => {
  return (
    <tr onClick={onClick} className="hover:bg-gray-100 cursor-pointer">
      <th>{index + 1}</th>
      <td>{product.name}</td>
      <td className="flex">
        {product.skus.map((variant: IProductVariant) => (
          <div className="flex" key={variant.id}>
            <Thumbnail image={variant.images[0]} size={ImageSize.S} />
          </div>
        ))}
      </td>
      <td>{product.description}</td>
      <td>
        {product.categories.map((category, i) => (
          <span key={category.id}>
            {i !== 0 && <span className="mx-2">{"/"}</span>}

            <span className="underline">{category.name}</span>
          </span>
        ))}
      </td>
      <td></td>
      <td></td>
      <td>{product.createdAt}</td>
    </tr>
  );
};

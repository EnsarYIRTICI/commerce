"use client";

import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import { findBySlug } from "@/lib/services/product.service";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useToast } from "@/lib/contexts/ToastContext";
import { ToastType } from "@/lib/enum/toast_type.enum";
import { IProduct } from "@/lib/types/IProduct";
import { useContent } from "@/lib/contexts/ContentContext";
import Thumbnail from "@/components/Thumbnail";
import { ImageSize } from "@/lib/enum/image_size.enum";

export default function page() {
  const params = useParams();

  const { token, isLoading, setIsLoading } = useContent();
  const { addToast } = useToast();

  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [product, setProduct] = useState<IProduct | null>(null);

  const _findBySlug = async () => {
    try {
      setIsLoading(true);

      const data = await findBySlug(slug, token);

      setProduct(data);
    } catch (error: any) {
      errorToast(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const errorToast = (message: string) => {
    addToast(message, ToastType.ERROR, 3000);
  };

  useEffect(() => {
    _findBySlug();
  }, []);

  return (
    <div className="flex-1 flex overflow-y-scroll px-7">
      {isLoading ? (
        <>
          <div className="my-5 skeleton w-[20rem] h-[5rem]"></div>
          <div className="my-5 skeleton w-[20rem] h-[5rem]"></div>
          <div className="my-5 skeleton w-[20rem] h-[5rem]"></div>
        </>
      ) : product ? (
        <>
          <div className="w-3/6">
            <div className="my-5 w-full flex justify-between">
              <h1 className="text-3xl font-bold">{product.name}</h1>
            </div>

            <div className="my-8 border-b"></div>

            <h1 className="my-3 font-bold">Details</h1>

            <table className="table-auto w-[35rem] text-sm">
              <tbody>
                <tr>
                  <td className="font-semibold text-gray-400">Name</td>
                  <td>{product.name}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-400">Description</td>
                  <td>{product.description ?? "No description available"}</td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-400">Categories</td>
                  <td>
                    {product.categories.map((category) => (
                      <span key={category.id}>{category.name}</span>
                    )) ?? "No categories"}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold text-gray-400">Created</td>
                  <td>{product.createdAt}</td>
                </tr>
              </tbody>
            </table>

            <div className="my-8 border-b"></div>

            <h1 className="my-3 font-bold">Variants</h1>

            <div>
              <table className="table table-auto text-sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Images</th>
                    <th>Stok</th>
                    <th>Price{"($)"}</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((variant) => (
                    <tr>
                      <td>{variant.name}</td>
                      <td>
                        {variant.images.map((image) => (
                          <Thumbnail
                            key={image.id}
                            image={image}
                            size={ImageSize.S}
                          />
                        ))}
                      </td>
                      <td>{variant.stock}</td>
                      <td>
                        {variant.price}
                        {" $"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="my-8 border-b"></div>

            <h1 className="my-3 font-bold">Reviews</h1>

            <div className="my-8 border-b"></div>

            <h1 className="my-3 font-bold">Shipping Rate</h1>

            <div className="my-8 border-b"></div>

            <h1 className="my-3 font-bold">Logs</h1>
          </div>

          <div className="w-3/6"></div>
        </>
      ) : (
        <h1>404</h1>
      )}
    </div>
  );
}

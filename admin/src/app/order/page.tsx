"use client";

import React, { useEffect, useState } from "react";

import { useContent } from "@/lib/contexts/ContentContext";
import { findOrders } from "@/lib/services/order.service";
import { Search } from "lucide-react";
import { IOrder } from "@/lib/types/IOrder";

import Thumbnail from "@/components/Thumbnail";
import { SidebarProvider } from "@/lib/contexts/SidebarContext";
import { Sidebar, SidebarItem } from "@/components/Sidebar";
import { sidebarNodes } from "@/nodes/sidebar.node";

export default function page() {
  const { isLoading, setIsLoading } = useContent();

  const [orders, setOrders] = useState<IOrder[] | null>(null);

  const _findOrders = async () => {
    try {
      setIsLoading(true);

      const orders = await findOrders();

      setOrders(orders);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    _findOrders();
  }, []);

  const skeletonArray = Array(10).fill(null);

  return (
    <html lang="en">
      <body className={`h-screen w-screen overflow-hidden flex`}>
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
            <h1 className="text-3xl font-bold">Orders</h1>
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
                <div
                  key={index}
                  className="skeleton w-full h-[5rem] mb-3"
                ></div>
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
                  {orders?.map((order: IOrder, index: number) => (
                    <Product
                      key={order.id}
                      order={order}
                      index={index}
                      onClick={() => {}}
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
      </body>
    </html>
  );
}

const Product = ({
  order,
  index,
  onClick,
}: {
  order: IOrder;
  index: number;
  onClick: () => void;
}) => {
  return (
    <tr onClick={onClick} className="hover:bg-gray-100 cursor-pointer">
      <th>{index + 1}</th>
      <td>{order.id}</td>
      <td className="flex"></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>{order.createdAt}</td>
    </tr>
  );
};

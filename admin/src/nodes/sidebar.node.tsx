import { Barcode, LayoutDashboard, Package2 } from "lucide-react";

export const sidebarNodes = [
  {
    key: "0-0",
    text: "Dashboard",
    icon: <LayoutDashboard />,
    path: "/",
  },
  {
    key: "1-0",
    text: "Product",
    icon: <Barcode />,
    path: "/product",
  },
  {
    key: "2-0",
    text: "Order",
    icon: <Package2 />,
    path: "/order",
  },
];

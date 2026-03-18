import { createContext, useContext, useState, ReactNode } from "react";
import { Tour } from "@/data/tours";

export interface Order {
  id: string;
  tour: Tour;
  guests: number;
  total: number;
  date: string;
  status: "pending" | "paid";
  paymentMethod?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (tour: Tour, guests: number, total: number) => void;
  payOrder: (orderId: string, method: string) => void;
  showOrders: boolean;
  setShowOrders: (v: boolean) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState(false);

  const addOrder = (tour: Tour, guests: number, total: number) => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      tour,
      guests,
      total,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      status: "pending",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const payOrder = (orderId: string, method: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "paid", paymentMethod: method } : o))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, payOrder, showOrders, setShowOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

import React, { createContext, useContext, useState } from "react";
import { History, Product, Shop, StockFull } from "../types";

type AppContextType = {
  stocks: StockFull[];
  setStocks: React.Dispatch<React.SetStateAction<StockFull[]>>;
  shops: Shop[];
  setShops: React.Dispatch<React.SetStateAction<Shop[]>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  history: History;
  setHistory: React.Dispatch<React.SetStateAction<History>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stocks, setStocks] = useState<StockFull[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [history, setHistory] = useState<History>({
    items: [],
    data: {
      page: 1,
      limit: 1,
      total: 0,
      pages: 0,
    },
  });

  return (
    <AppContext.Provider
      value={{
        stocks,
        setStocks,
        shops,
        setShops,
        products,
        setProducts,
        history,
        setHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("No context");
  }
  return context;
};

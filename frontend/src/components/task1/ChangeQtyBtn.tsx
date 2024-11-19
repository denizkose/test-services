import React, { useState } from "react";
import { StockFull } from "../../types";
import {
  increaseOrderStock,
  increaseShelfStock,
  decreaseOrderStock,
  decreaseShelfStock,
  fetchStocks,
} from "../../api";
import { useApp } from "../../providers/AppProvider";
import { IcRoundPlus } from "./icons/IcRoundPlus";
import { IcRoundMinus } from "./icons/IcRoundMinus";

interface ModalProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {
  stock: StockFull;
  type: "increaseOrder" | "increaseShelf" | "decreaseOrder" | "decreaseShelf";
}

const ChangeQtyBtn = ({ stock, type, ...props }: ModalProps) => {
  const { setStocks } = useApp();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const sign = type.includes("increase") ? "+" : "-";
  const qty = type.includes("Order")
    ? stock.order_quantity
    : stock.shelf_quantity;
  let total = {
    increaseOrder: stock.order_quantity + amount,
    increaseShelf: stock.shelf_quantity + amount,
    decreaseOrder: stock.order_quantity - amount,
    decreaseShelf: stock.shelf_quantity - amount,
  };
  const buttonText = type.includes("increase") ? "Add" : "Remove";

  const getStocks = async () => {
    try {
      const stocks = await fetchStocks();
      setStocks(stocks);
    } catch (error) {
      console.log("Failined rerender stocks table: ", error);
    }
  };

  const makeOperation = async () => {
    switch (type) {
      case "increaseOrder":
        await increaseOrderStock(amount, stock.id);
        setIsOpen(false);
        await getStocks();
        break;
      case "increaseShelf":
        await increaseShelfStock(amount, stock.id);
        setIsOpen(false);
        await getStocks();
        break;
      case "decreaseOrder":
        await decreaseOrderStock(amount, stock.id);
        setIsOpen(false);
        await getStocks();
        break;
      case "decreaseShelf":
        await decreaseShelfStock(amount, stock.id);
        setIsOpen(false);
        await getStocks();
        break;
      default:
        break;
    }

    setAmount(0);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} {...props}>
        {sign === "+" ? (
          <IcRoundPlus className="w-6 h-6" />
        ) : (
          <IcRoundMinus className="w-6 h-6" />
        )}
      </button>
      <div
        className={`${
          !isOpen && "hidden"
        } fixed z-50 inset-0 flex items-center justify-center overflow-hidden`}
      >
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="p-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl sm:max-w-lg sm:w-full">
          <div className="flex flex-row items-center w-full h-8 gap-4 px-4 pt-5 pb-4 text-lg font-bold bg-white sm:p-6 sm:pb-4">
            <span>{qty}</span>
            <span>{sign}</span>
            <input
              type="number"
              className="h-8 w-36"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <span>= {total[type]}</span>
          </div>
          <div className="flex gap-4 px-4 py-3 bg-gray-50">
            <button
              type="button"
              className={`w-28 ${sign === "+" ? "bg-green-800 text-green-100 hover:bg-green-700" : "bg-red-800 text-red-100 hover:bg-red-700"}`}
              onClick={makeOperation}
            >
              {buttonText}
            </button>
            <button
              type="button"
              className="w-28 bg-slate-800 text-slate-100"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeQtyBtn;

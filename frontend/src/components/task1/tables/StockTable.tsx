import ChangeQtyBtn from "../ChangeQtyBtn";
import { useApp } from "../../../providers/AppProvider";
import { useEffect } from "react";
import { fetchStocks } from "../../../api";

const StockTable = (props: React.HtmlHTMLAttributes<HTMLTableElement>) => {
  const { stocks, setStocks } = useApp();

  useEffect(() => {
    const getStocks = async () => {
      const stocks = await fetchStocks();
      setStocks(stocks);
    };
    getStocks();
  }, []);

  return (
    <table {...props}>
      <caption>Stocks</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>PLU</th>
          <th>Product</th>
          <th>Shelf QTY</th>
          <th>Order QTY</th>
          <th>Shop</th>
        </tr>
      </thead>
      <tbody>
        {stocks &&
          stocks
            .sort((a, b) => a.id - b.id)
            .map((stock) => (
              <tr key={stock.id}>
                <td className="text-center">{stock.id}</td>
                <td>{stock.product_plu}</td>
                <td>{stock.product_name}</td>
                <td className="font-semibold">
                  <span className="flex flex-row items-center justify-center gap-2">
                    <ChangeQtyBtn
                      type="decreaseShelf"
                      stock={stock}
                      className="decrease"
                    />
                    {stock.shelf_quantity}
                    <ChangeQtyBtn
                      type="increaseShelf"
                      stock={stock}
                      className="increase"
                    />
                  </span>
                </td>
                <td className="font-semibold">
                  <span className="flex flex-row items-center justify-center gap-2">
                    <ChangeQtyBtn
                      type="decreaseOrder"
                      stock={stock}
                      className="decrease"
                    />
                    {stock.order_quantity}
                    <ChangeQtyBtn
                      type="increaseOrder"
                      stock={stock}
                      className="increase"
                    />
                  </span>
                </td>
                <td>{stock.shop_name}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default StockTable;

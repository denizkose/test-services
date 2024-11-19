import { useState, FormEvent } from "react";
import { createStock, fetchStocks } from "../../../api";
import { useApp } from "../../../providers/AppProvider";
import { Stock } from "../../../types";

const StockForm = (props: React.HtmlHTMLAttributes<HTMLFormElement>) => {
  const { shops, products, setStocks } = useApp();

  const [stock, setStock] = useState<Partial<Stock>>({
    shelf_quantity: 0,
    order_quantity: 0,
  });

  const isDisabled =
    stock.product_id === undefined ||
    stock.shop_id === undefined ||
    stock.shelf_quantity === undefined ||
    stock.order_quantity === undefined;

  const handleStock = (updatedStock: Partial<Stock>) => {
    setStock({ ...stock, ...updatedStock });
  };

  const submitStock = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const s = await createStock(stock as Stock);
    if (s.ok) {
      setStock({});
      const f = e.target as HTMLFormElement;
      f.reset();
      setStocks(await fetchStocks());
    }
  };

  return (
    <form action="" method="post" onSubmit={submitStock} {...props}>
      <h2>Create Stock</h2>
      <label htmlFor="product">Product</label>
      <select
        name="product"
        id="product_id"
        defaultValue={""}
        onChange={(e) => handleStock({ product_id: Number(e.target.value) })}
      >
        <option value={""} disabled hidden>
          Choose a product...
        </option>
        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name}
          </option>
        ))}
      </select>
      <label htmlFor="shop">Shop</label>
      <select
        name="shop"
        id="shop_id"
        defaultValue={""}
        onChange={(e) => handleStock({ shop_id: Number(e.target.value) })}
      >
        <option value={""} disabled hidden>
          Choose a shop ...
        </option>
        {shops.map((shop) => (
          <option key={shop.id} value={shop.id}>
            {shop.name}
          </option>
        ))}
      </select>
      <label htmlFor="shelf_quantity">Shelf quantity</label>
      <input
        type="number"
        name="shelf_quantity"
        id="shelf_quantity"
        value={stock.shelf_quantity}
        onChange={(e) =>
          handleStock({ shelf_quantity: Number(e.target.value) })
        }
      />
      <label htmlFor="order_quantity">Order quantity</label>
      <input
        type="number"
        name="order_quantity"
        id="order_quantity"
        value={stock.order_quantity}
        onChange={(e) =>
          handleStock({ order_quantity: Number(e.target.value) })
        }
      />
      <button type="submit" disabled={isDisabled}>
        Add
      </button>
    </form>
  );
};

export default StockForm;

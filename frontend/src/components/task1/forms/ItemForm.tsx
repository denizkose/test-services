import { useState, FormEvent } from "react";
import { createProduct, fetchProducts } from "../../../api";
import { Product } from "../../../types";
import { useApp } from "../../../providers/AppProvider";

const ItemForm = (props: React.HtmlHTMLAttributes<HTMLFormElement>) => {
  const { setProducts } = useApp();

  const [product, setProduct] = useState<Partial<Product>>({
    plu: "",
    name: "",
  });

  const isDisabled = product.plu?.length === 0 || product.name?.length === 0;

  const submitItem = async (e: FormEvent) => {
    e.preventDefault();
    const p = await createProduct(product as Product);
    if (p.ok) {
      setProduct({ plu: "", name: "" });
      setProducts(await fetchProducts());
    }
  };

  const handleProduct = (updatedProduct: Partial<Product>) => {
    setProduct({ ...product, ...updatedProduct });
  };

  return (
    <form method="post" onSubmit={submitItem} {...props}>
      <h2>Create Product</h2>
      <label htmlFor="plu">PLU</label>
      <input
        type="text"
        name="plu"
        id="plu"
        value={product.plu}
        onChange={(e) => handleProduct({ plu: e.target.value })}
      />
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={product.name}
        onChange={(e) => handleProduct({ name: e.target.value })}
      />
      <button type="submit" disabled={isDisabled}>
        Add
      </button>
    </form>
  );
};

export default ItemForm;

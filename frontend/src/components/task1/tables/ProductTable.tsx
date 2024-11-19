import { useEffect } from "react";
import { useApp } from "../../../providers/AppProvider";
import { fetchProducts } from "../../../api";

const ProductTable = (props: React.HtmlHTMLAttributes<HTMLTableElement>) => {
  const { products, setProducts } = useApp();

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };
    getProducts();
  }, []);
  return (
    <table {...props}>
      <caption>Products</caption>
      <thead>
        <tr>
          <th>id</th>
          <th>plu</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.plu}</td>
            <td>{product.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;

import { useEffect } from "react";
import { fetchShops } from "../../../api";
import { useApp } from "../../../providers/AppProvider";

const ShopTable = (props: React.HtmlHTMLAttributes<HTMLTableElement>) => {
  const { shops, setShops } = useApp();

  useEffect(() => {
    const getShops = async () => {
      const shops = await fetchShops();
      setShops(shops);
    };
    getShops();
  }, []);

  return (
    <table {...props}>
      <caption>Shops</caption>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
        </tr>
      </thead>
      <tbody>
        {shops.map((shop) => (
          <tr key={shop.id}>
            <td>{shop.id}</td>
            <td>{shop.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShopTable;

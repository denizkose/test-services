import ShopTable from "./components/task1/tables/ShopTable";
import ProductTable from "./components/task1/tables/ProductTable";
import StockTable from "./components/task1/tables/StockTable";
import ItemForm from "./components/task1/forms/ItemForm";
import StockForm from "./components/task1/forms/StockForm";
import FilterStocksForm from "./components/task1/filters/FilterStocksForm";
import FilterProductsForm from "./components/task1/filters/FilterProductsForm";
import FilterHistoryForm from "./components/task1/filters/FilterHistoryForm";
import HistoryTable from "./components/task1/tables/HistoryTable";

function Task1() {
  return (
    <main className="container flex flex-col gap-4 py-8 mx-auto">
      <h1>Task 1</h1>
      <div className="grid grid-cols-1 gap-4">
        <div id="forms" className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <ItemForm className="col-span-3" />
          <ProductTable className="col-span-6" />
          <FilterProductsForm className="col-span-3 filter-form" />
        </div>
        <div id="info" className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <StockForm className="col-span-3" />
          <StockTable className="col-span-6" />
          <FilterStocksForm className="col-span-3 filter-form" />
        </div>
        <div id="stocks" className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <ShopTable className="col-span-3" />
          <HistoryTable className="col-span-6" />
          <FilterHistoryForm className="col-span-3 filter-form" />
        </div>
      </div>
    </main>
  );
}

export default Task1;

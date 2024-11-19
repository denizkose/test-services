import { useState, FormEvent } from "react";
import { fetchFilteredStocks } from "../../../api";
import { useApp } from "../../../providers/AppProvider";

type Filter = {
  plu: string;
  shop_id: number;
  min_shelf: number;
  max_shelf: number;
  min_order: number;
  max_order: number;
};

const FilterStocksForm = (props: React.HtmlHTMLAttributes<HTMLFormElement>) => {
  const { setStocks } = useApp();

  const [filter, setFilter] = useState<Partial<Filter>>({
    plu: "",
  });

  const handle = (updatedFilter: Partial<Filter>) => {
    setFilter({ ...filter, ...updatedFilter });
  };

  const submitFilter = async (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const params = Object.entries(filter)
      .filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    const s = await fetchFilteredStocks(params);
    setStocks(s);
    return s;
  };

  const reset = async (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    const r = e.target as HTMLFormElement;
    r.reset();
    setFilter({});
    const s = await fetchFilteredStocks("");
    setStocks(s);
  };

  return (
    <form
      action=""
      method="get"
      onSubmit={(e) => submitFilter(e)}
      onReset={reset}
      {...props}
    >
      <legend className="col-span-2 text-lg font-semibold">
        Filter Stocks
      </legend>
      <div>
        <label htmlFor="plu">PLU</label>
        <input
          type="text"
          name="plu"
          onChange={(e) => handle({ plu: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="shop_id">SHOP ID</label>
        <input
          type="number"
          name="shop_id"
          onChange={(e) => handle({ shop_id: Number(e.target.value) })}
        />
      </div>
      <div>
        <label htmlFor="min_shelf">MIN SHELF</label>
        <input
          type="number"
          name="min_shelf"
          value={filter.min_shelf}
          onChange={(e) => handle({ min_shelf: Number(e.target.value) })}
        />
      </div>
      <div>
        <label htmlFor="max_shelf">MAX SHELF</label>
        <input
          type="number"
          name="max_shelf"
          value={filter.max_shelf}
          min={filter.min_shelf}
          onChange={(e) => handle({ max_shelf: Number(e.target.value) })}
        />
      </div>
      <div>
        <label htmlFor="min_order">MIN ORDER</label>
        <input
          type="number"
          name="min_order"
          value={filter.min_order}
          onChange={(e) => handle({ min_order: Number(e.target.value) })}
        />
      </div>
      <div>
        <label htmlFor="max_order">MAX ORDER</label>
        <input
          type="number"
          name="max_order"
          value={filter.max_order}
          min={filter.min_order}
          onChange={(e) => handle({ max_order: Number(e.target.value) })}
        />
      </div>
      <span className="flex flex-row gap-2">
        <button type="submit" className="w-1/2">
          Filter
        </button>
        <button type="reset" className="w-1/2">
          Reset
        </button>
      </span>
    </form>
  );
};

export default FilterStocksForm;

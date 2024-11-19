import { useState, FormEvent } from "react";
import { fetchFilteredProducts } from "../../../api";
import { useApp } from "../../../providers/AppProvider";

type Filter = {
  plu: string;
  name: string;
};

const FilterProductsForm = (
  props: React.HtmlHTMLAttributes<HTMLFormElement>
) => {
  const { setProducts } = useApp();

  const [filter, setFilter] = useState<Partial<Filter>>({
    plu: "",
    name: "",
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
    const p = await fetchFilteredProducts(params);
    setProducts(p);
    return p;
  };

  const reset = async (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    const r = e.target as HTMLFormElement;
    r.reset();
    setFilter({});
    const p = await fetchFilteredProducts("");
    setProducts(p);
  };

  return (
    <form
      action=""
      method="get"
      onSubmit={(e) => submitFilter(e)}
      onReset={reset}
      {...props}
    >
      <legend className="text-lg font-semibold">Filter Products</legend>
      <div>
        <label htmlFor="plu">PLU</label>
        <input
          type="text"
          name="plu"
          onChange={(e) => handle({ plu: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="name">NAME</label>
        <input
          type="text"
          name="name"
          onChange={(e) => handle({ name: e.target.value })}
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

export default FilterProductsForm;

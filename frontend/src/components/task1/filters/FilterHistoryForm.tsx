import { useState, FormEvent } from "react";
import { fetchFilteredHistory } from "../../../api";
import { useApp } from "../../../providers/AppProvider";

type Filter = {
  plu: string;
  shop_id: number;
  action:
    | "created"
    | "increased shelf"
    | "increased order"
    | "decreased shelf"
    | "decreased order";
  min_action_date: string;
  max_action_date: string;
};

const FilterHistoryForm = (
  props: React.HtmlHTMLAttributes<HTMLFormElement>
) => {
  const { setHistory } = useApp();

  const [filter, setFilter] = useState<Partial<Filter>>({});

  const actions: Filter["action"][] = [
    "created",
    "increased shelf",
    "increased order",
    "decreased shelf",
    "decreased order",
  ];

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
    const h = await fetchFilteredHistory(params);
    setHistory(h);
    return h;
  };

  const reset = async (
    e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>
  ) => {
    const r = e.target as HTMLFormElement;
    r.reset();
    setFilter({});
    const h = await fetchFilteredHistory("");
    setHistory(h);
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
        <label htmlFor="shop_id">SHOP ID</label>
        <input
          type="number"
          name="shop_id"
          defaultValue={""}
          onChange={(e) => handle({ shop_id: Number(e.target.value) })}
        />
      </div>
      <div>
        <label htmlFor="action">ACTION</label>
        <select
          name="action"
          defaultValue={""}
          onChange={(e) =>
            handle({ action: e.target.value as Filter["action"] })
          }
        >
          <option value="" hidden>
            Choose action ...
          </option>
          {actions.map((action) => (
            <option value={action} key={action}>
              {(action = action.charAt(0).toUpperCase() + action.slice(1))}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="min_action_date">MIN DATE</label>
        <input
          type="date"
          name="min_action_date"
          onChange={(e) => handle({ min_action_date: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="max_action_date">MAX DATE</label>
        <input
          type="date"
          name="max_action_date"
          onChange={(e) => handle({ max_action_date: e.target.value })}
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

export default FilterHistoryForm;

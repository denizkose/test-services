import { useEffect, useState } from "react";
import { useApp } from "../../../providers/AppProvider";
import { fetchFilteredHistory } from "../../../api";

const HistoryTable = (props: React.HtmlHTMLAttributes<HTMLTableElement>) => {
  const { history, setHistory } = useApp();
  const [page, setPage] = useState<number>(1);

  console.log(history);
  const pages = [];
  for (let i = 1; i <= history.data.pages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    const getHistory = async () => {
      const history = await fetchFilteredHistory(`page=${page}`);
      setHistory(history);
    };
    getHistory();
  }, [page]);

  return (
    <div {...props}>
      <table>
        <caption>History</caption>
        <thead>
          <tr>
            <th>id</th>
            <th>plu</th>
            <th>stock_id</th>
            <th>shop_id</th>
            <th>action</th>
            <th>action_date</th>
          </tr>
        </thead>
        <tbody>
          {history.items.map((h) => (
            <tr key={h.id}>
              <td>{h.id}</td>
              <td>{h.plu}</td>
              <td>{h.stock_id}</td>
              <td>{h.shop_id}</td>
              <td>{h.action}</td>
              <td>
                {new Date(h.action_date).toLocaleDateString("en-UK", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row items-center justify-center gap-2 p-2">
        {pages.map((page) => (
          <button
            className={`${page === history.data.page ? "bg-slate-800 text-slate-100" : "bg-slate-100 text-slate-800"} p-2 rounded-full w-8 h-8 flex justify-center items-center`}
            onClick={() => setPage(page)}
            key={page}
          >
            <span>{page}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryTable;

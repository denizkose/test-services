interface StockHistory {
    id: number;
    stock_id: number;
    plu: string;
    shop_id: number;
    action: string;
    action_date: string;
}

interface StockHistoryFilter {
    id: number;
    shop_id: number;
    action: string;
    min_action_date: string;
    max_action_date: string;
}
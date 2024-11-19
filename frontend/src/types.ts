export interface Shop {
    id: number;
    name: string;
}

export interface Product {
    id: number;
    plu: string;
    name: string;
}

export interface Stock {
    id: number;
    product_id: number;
    shop_id: number;
    shelf_quantity: number;
    order_quantity: number;
}

export interface History {
    items: {
        id: number;
        stock_id: number;
        plu: string;
        shop_id: number;
        action: string;
        action_date: string;
    }[]
    data: {
        page: number;
        limit: number;
        total: number
        pages: number
    }
}

export interface StockFull extends Stock {
    id: number;
    product_plu: string;
    product_name: string;
    shop_name: string;
}

export interface StockFiltered {
    plu: string
    shop_id: number;
    min_shelf: number;
    max_shelf: number;
    min_order: number;
    max_order: number;
}
import { Product, Stock } from "./types"

const api = import.meta.env.VITE_API_1
const api_history = import.meta.env.VITE_API_2
const api_users = import.meta.env.VITE_API_3

// Task 1

type HistoryEntry = {
    stock_id: number;
    action: 'created' | 'increased shelf' | 'increased order' | 'decreased shelf' | 'decreased order';
}
export const createHistory = async ({ stock_id, action }: HistoryEntry) => {
    const result = await fetch(api_history + 'history/stock', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ stock_id: stock_id, action: action })
    })
    return result
}
export const fetchHistory = async () => {
    const result = await fetch(api_history + 'history/stock').then(res => res.json())
    return result
}
export const fetchFilteredHistory = async (params: string) => {
    const result = await fetch(api_history + 'history/stock?' + params,).then(res => res.json())
    return result
}
export const fetchShops = async () => {
    const result = await fetch(api + 'shops').then(res => res.json())
    return result
}
export const fetchProducts = async () => {
    const result = await fetch(api + 'products').then(res => res.json())
    return result
}
export const fetchFilteredProducts = async (params: string) => {
    const result = await fetch(api + 'products?' + params,).then(res => res.json())
    return result
}
export const fetchStocks = async () => {
    const result = await fetch(api + 'stocks').then(res => res.json())
    return result
}
export const fetchFilteredStocks = async (params: string) => {
    const result = await fetch(api + 'stocks?' + params,).then(res => res.json())
    return result
}
export const createProduct = async (data: Product): Promise<Response> => {
    const result = await fetch(api + 'products', {
        method: 'POST', headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return result
}
export const createStock = async (data: Stock): Promise<Response> => {
    try {
        const result = await fetch(api + 'stocks', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const stock = await result.json() as Stock;
        await createHistory({ stock_id: stock.id, action: 'created' })
        return result
    } catch (error) {
        console.error('Stock not created: ', error)
        return JSON.parse(`{error:${error}}`)
    }

}
export const increaseOrderStock = async (amount: number, stock_id: number) => {
    const result = await fetch(api + 'stocks/increase_order', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount, stock_id: stock_id })
    })

    const stock = await result.json() as Stock;
    await createHistory({ stock_id: stock.id, action: 'increased order' })
    return result
}
export const increaseShelfStock = async (amount: number, stock_id: number) => {
    const result = await fetch(api + 'stocks/increase_shelf', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount, stock_id: stock_id })
    })

    const stock = await result.json() as Stock;
    await createHistory({ stock_id: stock.id, action: 'increased shelf' })
    return result
}
export const decreaseOrderStock = async (amount: number, stock_id: number) => {
    const result = await fetch(api + 'stocks/decrease_order', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount, stock_id: stock_id })
    })

    const stock = await result.json() as Stock;
    await createHistory({ stock_id: stock.id, action: 'decreased order' })
    return result
}
export const decreaseShelfStock = async (amount: number, stock_id: number) => {
    const result = await fetch(api + 'stocks/decrease_shelf', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount, stock_id: stock_id })
    })

    const stock = await result.json() as Stock;
    await createHistory({ stock_id: stock.id, action: 'decreased shelf' })
    return result
}

// Task 2
export const fetchUsers = async () => {
    const result = await fetch(api_users + 'users').then(res => res.json())
    return result
}
export const removeUsers = async () => {
    const result = await fetch(api_users + 'users', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result.json()
}
export const addUsers = async () => {
    const result = await fetch(api_users + 'users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result.json()
}
export const resetUsersProblems = async () => {
    const result = await fetch(api_users + 'users/reset', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return result.json()
}
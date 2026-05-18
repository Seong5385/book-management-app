import {Book, BookRequest} from "@/types/book";

const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8080'

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
    const url = `${BASE_URL}/${path}`;
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
    },
        ...options
    })

    if(!res.ok) {
        const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }))
        throw new Error((err as { message?: string }).message ?? `HTTP ${res.status}`);
    }

    if (res.status === 204) return null as T
    return res.json() as Promise<T>
}

export const bookApi = {
    getAllBooks: (): Promise<Book[]> =>
        fetchApi<Book[]>('api/books/'),

    getByBookId: (bookId: number): Promise<Book> =>
        fetchApi<Book>(`api/books/${bookId}`),

    createBook: (data: BookRequest): Promise<Book> =>
        fetchApi<Book>('api/books/', {
            method: 'POST',
            body: JSON.stringify(data),
        }),

    deleteBook: (bookId: number):Promise<void> =>
        fetchApi<void>(`api/books/${bookId}`, { method: 'DELETE' }),

    updateBook: (bookId: number, data: BookRequest): Promise<void> =>
        fetchApi<void>(`api/books/${bookId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        }),
}
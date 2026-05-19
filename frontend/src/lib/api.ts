const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export interface BookRequest {
    title: string;
    author: string;
    price: number;
    available: boolean;
}

export const bookApi = {
    getAllBooks: async () => {
        const response = await fetch(`${BASE_URL}/api/books/`, { cache: "no-store" });
        return response.json();
    },

    getByBookId: async (id: number) => {
        const response = await fetch(`${BASE_URL}/api/books/${id}`, { cache: "no-store" });
        return response.json();
    },

    createBook: async (data: BookRequest) => {
        const response = await fetch(`${BASE_URL}/api/books/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    updateBook: async (id: number, data: BookRequest) => {
        const response = await fetch(`${BASE_URL}/api/books/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        return response.json();
    },

    toggleBookAvailable: async (id: number) => {
        const response = await fetch(`${BASE_URL}/api/books/${id}/toggle`, {
            method: "PUT",
        });
        return response.json();
    },

    deleteBook: async (id: number) => {
        const response = await fetch(`${BASE_URL}/api/books/${id}`, {
            method: "DELETE",
        });
        return response.json();
    }
};
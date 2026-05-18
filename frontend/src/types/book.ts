export interface Book {
    id: number;
    title: string;
    author: string;
    price: number;
    available: boolean;
}

export interface BookRequest {
    title: string;
    author: string;
    price: number;
    available: boolean;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: string;
}
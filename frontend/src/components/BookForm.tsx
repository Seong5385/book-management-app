"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Book, BookRequest } from "@/types/book";
import { bookApi } from "@/lib/api";

interface BookListClientProps {
    initialBooks: Book[];
}

export default function BookListClient({ initialBooks }: BookListClientProps) {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [available, setAvailable] = useState(true);

    const loadBookList = useCallback(async () => {
        try {
            setLoading(true);
            const result = await bookApi.getAllBooks() as any;
            if (result && Array.isArray(result.data)) setBooks(result.data);
            else if (Array.isArray(result)) setBooks(result);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (editBook) {
            setTitle(editBook.title);
            setAuthor(editBook.author);
            setPrice(editBook.price);
            setAvailable(editBook.available);
        }
    }, [editBook]);

    const successMessage = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => setSuccessMsg(null), 3000);
    };

    const handleUpdateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editBook) return;
        if (!title || !author || price === "") {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        const bookData: BookRequest = { title, author, price: Number(price), available };

        try {
            await bookApi.updateBook(editBook.id, bookData);
            successMessage('책 정보가 수정되었습니다');
            setShowEditForm(false);
            setEditBook(null);
            loadBookList();
        } catch (e) {
            alert("수정 처리 중 오류가 발생했습니다.");
        }
    };

    const handleDeleteBook = async (id: number) => {
        if (!confirm('삭제 하시겠습니까?')) return;
        try {
            await bookApi.deleteBook(id);
            successMessage('해당 책의 등록 정보가 삭제되었습니다');
            loadBookList();
        } catch (e) {
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl">📚</span>
                        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Book Management</h1>
                    </div>
                    <Link
                        href="/register"
                        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all active:scale-98"
                    >
                        ✨ 새 도서 등록
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                {successMsg && (
                    <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl">
                        🎉 {successMsg}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className={showEditForm ? "lg:col-span-2 space-y-4" : "lg:col-span-3 space-y-4"}>
                        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                            <h2 className="text-lg font-bold text-gray-900">
                                보유 도서 목록 <span className="ml-2 text-sm text-blue-600">{books.length}권</span>
                            </h2>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-6 h-36" />
                                ))}
                            </div>
                        ) : books.length === 0 ? (
                            <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white py-16 text-center">
                                <span className="text-4xl block mb-2">📥</span>
                                <p className="text-gray-500 font-medium">등록된 도서가 없습니다.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {books.map((book) => (
                                    <div key={book.id} className="group relative flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-all">
                                        <div>
                                            <div className="flex items-start justify-between gap-2">
                                                <Link href={`/books/${book.id}`} className="flex-1 group">
                                                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer">
                                                        {book.title}
                                                    </h3>
                                                </Link>
                                                <span className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold ${book.available ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                                                    {!book.available ? "대여 중" : "대여 가능"}
                                                </span>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">✍️ {book.author}</p>
                                        </div>
                                        <div className="mt-5 flex items-center justify-between border-t border-gray-50 pt-3">
                                            <span className="text-base font-bold text-gray-900">{book.price.toLocaleString()}원</span>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => { setEditBook(book); setShowEditForm(true); }}
                                                    className="rounded-lg px-2.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                                                >
                                                    ✏️ 수정
                                                </button>
                                                <button onClick={() => handleDeleteBook(book.id)} className="rounded-lg px-2.5 py-1.5 text-xs text-red-600 hover:bg-red-50 transition-colors">🗑️ 삭제</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {showEditForm && editBook && (
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="mb-4 flex items-center justify-between border-b border-gray-50 pb-3">
                                    <h3 className="font-bold text-gray-900">📝 도서 정보 수정</h3>
                                    <button onClick={() => { setShowEditForm(false); setEditBook(null); }} className="text-gray-400 hover:text-gray-600 text-sm">닫기</button>
                                </div>

                                <form onSubmit={handleUpdateSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">도서 제목</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">저자 이름</label>
                                        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 bg-white" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">가격 (원)</label>
                                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 bg-white" />
                                    </div>
                                    <button type="submit" className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white">수정 완료하기</button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { ApiResponse, Book } from "@/types/book";
import { bookApi } from "@/lib/api";
import ToggleAvailableButton from "@/components/ToggleAvailableButton";

export const dynamic = "force-dynamic";

interface BookDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function getBookInfo(id: string): Promise<Book | null> {
    if (!id || id === "NaN" || isNaN(Number(id))) {
        return null;
    }
    try {
        const result = (await bookApi.getByBookId(Number(id))) as unknown as ApiResponse<Book>;
        if (result && result.data) {
            return result.data;
        }
        return result as unknown as Book;
    } catch (e) {
        console.error("도서 상세 정보 로드 실패:", e);
        return null;
    }
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
    const resolvedParams = await params;
    const book = await getBookInfo(resolvedParams.id);

    if (!book) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 antialiased">
            <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 shadow-md">

                <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl">📖</span>
                        <h1 className="text-xl font-bold text-gray-900">도서 상세 정보</h1>
                    </div>
                    <Link
                        href="/"
                        className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        ← 목록으로 돌아가기
                    </Link>
                </div>

                <div className="space-y-4">
                    <div>
                        <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            도서 식별 번호 (ID)
                        </span>
                        <div className="text-sm font-mono font-bold text-blue-600 bg-blue-50/50 rounded-xl px-3 py-2 border border-blue-100/50 inline-block">
                            #{book.id}
                        </div>
                    </div>

                    <div>
                        <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            도서 제목
                        </span>
                        <div className="w-full rounded-xl border border-gray-100 bg-gray-50/40 px-4 py-2.5 text-base font-bold text-gray-900">
                            {book.title}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                저자 이름
                            </span>
                            <div className="w-full rounded-xl border border-gray-100 bg-gray-50/40 px-4 py-2.5 text-sm font-medium text-gray-800">
                                {book.author}
                            </div>
                        </div>

                        <div>
                            <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                도서 가격
                            </span>
                            <div className="w-full rounded-xl border border-gray-100 bg-gray-50/40 px-4 py-2.5 text-sm font-bold text-gray-900">
                                {book.price.toLocaleString()}원
                            </div>
                        </div>
                    </div>

                    <div>
                        <span className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                            현재 대여 상태
                        </span>
                        <div className="flex items-center space-x-2">
                            <span
                                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                                    book.available
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                        : "bg-red-50 text-red-700 border border-red-100"
                                }`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full mr-1.5 ${book.available ? "bg-emerald-500" : "bg-red-500"}`} />
                                {book.available ? "대여 가능 (보유 중)" : "대여 중 (대출 불가)"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-50 flex gap-2">
                    <ToggleAvailableButton book={book} />
                    <Link
                        href="/"
                        className="flex-1 rounded-xl bg-gray-100 py-3 text-center text-xs font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-200"
                    >
                        돌아가기
                    </Link>
                </div>

            </div>
        </div>
    );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookRequest } from "@/types/book";
import { bookApi } from "@/lib/api";

export default function RegisterPage() {
    const router = useRouter();

    // 입력 폼을 위한 로컬 상태들
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [available, setAvailable] = useState(true);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const successMessage = (msg: string) => {
        setSuccessMsg(msg);
        setTimeout(() => {
            setSuccessMsg(null);
            router.push("/"); // 💡 알림이 뜨고 1.5초 뒤에 도서 목록 메인 페이지로 자동 이동
            router.refresh();  // 메인 페이지 데이터 동기화 리프레시
        }, 1500);
    };

    // 💡 이벤트 타입을 React.FormEvent로 정확하게 지정
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !author || price === "") {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        const bookData: BookRequest = {
            title,
            author,
            price: Number(price),
            available,
        };

        try {
            await bookApi.createBook(bookData);
            successMessage("책 등록이 완료되었습니다! 목록으로 이동합니다.");
        } catch (err) {
            alert("요청 처리 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 antialiased">
            {/* 알림 메시지 스낵바 */}
            {successMsg && (
                <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl">
                    🎉 {successMsg}
                </div>
            )}

            {/* 카드 레이아웃 정돈 */}
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between border-b border-gray-50 pb-3">
                    <h3 className="font-bold text-xl text-gray-900">📙 신규 도서 등록</h3>
                    <button
                        onClick={() => router.push("/")}
                        className="text-gray-400 hover:text-gray-600 text-sm"
                    >
                        취소하고 돌아가기
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            도서 제목
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="예: 스프링 부트 실전 가이드"
                            className="w-full rounded-xl border text-blue-600 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            저자 이름
                        </label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="예: 홍길동"
                            className="w-full rounded-xl border text-blue-600 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            가격 (원)
                        </label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                            placeholder="예: 25000"
                            className="w-full rounded-xl border text-blue-600 border-gray-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                        <span className="text-sm font-medium text-gray-600">대여 가능 여부</span>
                        <button
                            type="button"
                            onClick={() => setAvailable(available)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                available ? "bg-blue-600" : "bg-gray-200"
                            }`}
                        >
              <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      available ? "translate-x-5" : "translate-x-0"
                  }`}
              />
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-gray-900 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800"
                    >
                        도서 등록하기
                    </button>
                </form>
            </div>
        </div>
    );
}
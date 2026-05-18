"use client";

import { useState } from "react";
import { Book, BookRequest } from "@/types/book";
import { bookApi } from "@/lib/api";

interface ToggleButtonProps {
    book: Book;
}

export default function ToggleAvailableButton({ book }: ToggleButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleToggle = async () => {
        if (loading) return;

        // 💡 핵심 로직: 반납이면 true로, 대출이면 false로 바꿀 목적 상태 값을 정의!
        // 현재 available이 true(대여가능)면 -> 다음 상태는 false(대출처리)
        // 현재 available이 false(대여중)면 -> 다음 상태는 true(반납처리)
        const nextAvailableState = !book.available;

        const confirmMsg = book.available
            ? "이 책을 대여 처리하시겠습니까? (상태를 '대여 중'으로 변경)"
            : "이 책을 반납 처리하시겠습니까? (상태를 '대여 가능'으로 변경)";

        if (!confirm(confirmMsg)) return;

        try {
            setLoading(true);

            // 💡 백엔드가 요구하는 수정 스펙(제목, 저자, 가격, 바뀔 상태)을 정확히 조립!
            const updatedData: BookRequest = {
                title: book.title,
                author: book.author,
                price: book.price,
                available: nextAvailableState // 꺾어놓은 반대값을 정확하게 탑재!
            };

            // 💡 백엔드 PUT API 호출
            await bookApi.updateBook(book.id, updatedData);

            alert(nextAvailableState ? "반납 처리가 완료되었습니다!" : "대여 처리가 완료되었습니다!");

            // 💡 브라우저 창을 강제로 새로고침(F5)해서 백엔드에서 바뀐 최신 DB 상태를 다시 긁어옴
            window.location.reload();
        } catch (e) {
            console.error("대여 상태 변경 실패:", e);
            alert("상태 변경 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`flex-[2] rounded-xl py-3 text-center text-xs font-semibold text-white shadow-sm transition-all ${
                loading ? "bg-gray-400 cursor-not-allowed" :
                    book.available ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
        >
            {loading ? "처리 중..." : book.available ? "🛒 대여하기" : "↩️ 반납하기"}
        </button>
    );
}
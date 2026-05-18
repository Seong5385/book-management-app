import { ApiResponse, Book } from "@/types/book";
import { bookApi } from "@/lib/api";
import BookForm from "@/components/BookForm";

async function getBooks() {
  try {
    const result = (await bookApi.getAllBooks()) as unknown as ApiResponse<Book[]>;
    if (result && Array.isArray(result.data)) return result.data;
    if (Array.isArray(result)) return result;
    return [];
  } catch (e) {
    console.error("도서 로드 실패:", e);
    return [];
  }
}

export default async function Home() {
  const initialBooks = await getBooks();
  return <BookForm initialBooks={initialBooks} />;
}
package com.project.backend.book.service;

import com.project.backend.book.domain.Book;
import com.project.backend.book.dto.request.BookRegisterRequest;
import com.project.backend.book.dto.request.BookUpdateRequest;
import com.project.backend.book.dto.response.BookInfoResponse;
import com.project.backend.book.repository.BookRepository;
import com.project.backend.globel.exception.BookManagerException;
import com.project.backend.globel.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService {
    private final BookRepository bookRepository;

    public void registerBook(BookRegisterRequest request) {
        bookRepository.save(Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .price(request.getPrice())
                .build());
    }

    public BookInfoResponse findByBookId(Long BookId) {
        Book book = bookRepository.findById(BookId).orElseThrow(() -> new BookManagerException(ErrorCode.B0OK_NOT_FOUND));
        return BookInfoResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .price(book.getPrice())
                .available(book.getAvailable()) // 💡 국경선 돌파: 대여 상태값 드디어 프론트로 전송!
                .build();
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    public List<BookInfoResponse> findAllBooks() {
        return bookRepository.findAll().stream().map(book -> BookInfoResponse.builder()
                        .id(book.getId())
                        .title(book.getTitle())
                        .author(book.getAuthor())
                        .price(book.getPrice())
                        .available(book.getAvailable()) // 💡 목록 조회에서도 상태값 전송!
                        .build())
                .collect(Collectors.toList());
    }

    public void updateBook(Long id, BookUpdateRequest request) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookManagerException(ErrorCode.B0OK_NOT_FOUND));

        // 💡 안전장치: 프론트가 대여버튼만 눌러서 다른 필드가 null로 오면, 기존 DB 값을 지키도록 방어!
        String newTitle = (request.getTitle() != null && !request.getTitle().isBlank()) ? request.getTitle() : book.getTitle();
        String newAuthor = (request.getAuthor() != null && !request.getAuthor().isBlank()) ? request.getAuthor() : book.getAuthor();
        Integer newPrice = (request.getPrice() != null && request.getPrice() > 0) ? request.getPrice() : book.getPrice();

        book.updateBookInfo(newTitle, newAuthor, newPrice);
        book.updateAvailable(request.isAvailable());

        bookRepository.save(book);
    }
}
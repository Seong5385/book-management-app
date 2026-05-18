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
                .build())
                .collect(Collectors.toList());
    }

    public void updateBook(Long id, BookUpdateRequest request) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new BookManagerException(ErrorCode.B0OK_NOT_FOUND));
        book.updateBookInfo(
                request.getTitle(),
                request.getAuthor(),
                request.getPrice()
        );

        book.updateAvailable(request.isAvailable());
    }
}

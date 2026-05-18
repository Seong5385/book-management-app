package com.project.backend.book.controller;

import com.project.backend.book.dto.request.BookRegisterRequest;
import com.project.backend.book.dto.request.BookUpdateRequest;
import com.project.backend.book.dto.response.BookInfoResponse;
import com.project.backend.book.service.BookService;
import com.project.backend.globel.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books/")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {
    private final BookService bookService;

    @PostMapping
    public ResponseEntity<ApiResponse<String>> create(@RequestBody BookRegisterRequest request) {
        bookService.registerBook(request);
        return ResponseEntity.ok(ApiResponse.success("책 등록 완료", HttpStatus.CREATED));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<BookInfoResponse>>> allBookInfo() {
        return ResponseEntity.ok(ApiResponse.success(bookService.findAllBooks()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BookInfoResponse>> bookInfo(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success(bookService.findByBookId(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> updateBook(@PathVariable Long id,
                                                         @RequestBody BookUpdateRequest request) {
        bookService.updateBook(id, request);
        return ResponseEntity.ok(ApiResponse.success("업데이트 성공", HttpStatus.OK));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<String>> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok(ApiResponse.success("해당 도서 삭제 완료",  HttpStatus.NO_CONTENT));
    }
}

package com.project.backend.book.repository;

import com.project.backend.book.domain.Book;
import com.project.backend.book.dto.response.BookInfoResponse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

}

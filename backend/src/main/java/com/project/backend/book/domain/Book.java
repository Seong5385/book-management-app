package com.project.backend.book.domain;

import com.project.backend.book.dto.request.BookRegisterRequest;
import com.project.backend.globel.Entity.BaseTimeEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Entity
@Table(name = "books")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Book extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column
    private Integer price;

    private Boolean available = true;

    @Builder
    public Book(String title, String author, Integer price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }

    public void updateAvailable(Boolean available) {
        this.available = available;
    }

    public void updateBookInfo(String title, String author, Integer price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }
}

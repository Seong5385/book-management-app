package com.project.backend.book.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class BookUpdateRequest {
    private String title;
    private String author;
    private Integer price;
    private boolean available;
}

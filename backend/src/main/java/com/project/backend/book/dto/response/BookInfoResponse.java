package com.project.backend.book.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
public class BookInfoResponse {
    private Long id;
    private String title;
    private String author;
    private Integer price;
}

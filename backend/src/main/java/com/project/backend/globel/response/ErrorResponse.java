package com.project.backend.globel.response;


import com.project.backend.globel.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ErrorResponse {

    private String code;
    private String message;
    private LocalDateTime timestamp;

    public static ErrorResponse of(ErrorCode ec) {
        return ErrorResponse.builder()
                .code(ec.getCode()).message(ec.getMessage())
                .timestamp(LocalDateTime.now()).build();
    }
    public static ErrorResponse of(String code, String message) {
        return ErrorResponse.builder()
                .code(code).message(message)
                .timestamp(LocalDateTime.now()).build();
    }

}

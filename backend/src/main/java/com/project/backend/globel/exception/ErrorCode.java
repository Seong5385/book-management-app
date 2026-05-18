package com.project.backend.globel.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    B0OK_NOT_FOUND (HttpStatus.NOT_FOUND, "책이 존재하지 않습니다", "404");

    private final HttpStatus status;
    private final String message;
    private final String code;
}

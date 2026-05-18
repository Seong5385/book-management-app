package com.project.backend.globel.exception;

import lombok.Getter;

@Getter
public class BookManagerException extends RuntimeException {
    private final ErrorCode errorCode;

    public BookManagerException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}

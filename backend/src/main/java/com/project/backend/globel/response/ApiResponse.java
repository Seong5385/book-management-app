package com.project.backend.globel.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public class ApiResponse<T> {
    private final boolean success;
    private final String message;
    private final T data;
    private final int status;

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "요청 완료", data, HttpStatus.OK.value());
    }

    public static <T> ApiResponse<T> success(String message, HttpStatus status) {
        return new ApiResponse<>(true, message, null, status.value());
    }

    public static <T> ApiResponse<T> error(String message, HttpStatus status) {
        return new ApiResponse<>(false, message, null, status.value());
    }
}

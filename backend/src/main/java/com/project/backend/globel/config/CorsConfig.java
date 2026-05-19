package com.project.backend.globel.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.List;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        CorsConfiguration config = new CorsConfiguration();

        // 인증 정보 허용
        config.setAllowCredentials(true);

        // 허용할 프론트 주소
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:*",
                "http://127.0.0.1:*",
                "https://bookmanager.o-r.kr",
                "https://www.bookmanager.o-r.kr"
        ));

        // 허용 메서드
        config.setAllowedMethods(List.of(
                "GET",
                "POST",
                "PUT",
                "DELETE",
                "PATCH",
                "OPTIONS"
        ));

        // 허용 헤더
        config.setAllowedHeaders(List.of("*"));

        // 응답 헤더 노출
        config.setExposedHeaders(List.of("*"));

        // preflight 캐시 시간
        config.setMaxAge(3600L);

        // 전체 경로 적용
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
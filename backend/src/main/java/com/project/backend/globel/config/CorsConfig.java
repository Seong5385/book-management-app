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
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // 1. 자격증명(쿠키, 인증헤더 등)을 프론트엔드와 주고받을 수 있도록 허용
        config.setAllowCredentials(true);

        // 2. 허용할 프론트엔드 주소 패턴 설정 (localhost의 모든 포트 허용)
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:[*]",
                "http://127.0.0.1:[*]"
        ));

        // 3. 허용할 HTTP 메서드 등록
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));

        // 4. 허용할 헤더 등록 (모든 헤더 수용)
        config.setAllowedHeaders(List.of("*"));

        // 5. 프론트엔드가 내 응답을 캐싱할 수 있는 시간 설정 (1시간)
        config.setMaxAge(3600L);

        // 모든 API 경로(/**)에 위 설정을 적용
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}

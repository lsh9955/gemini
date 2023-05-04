package com.gemini.authservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class AuthServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
	}

//	@Bean
//	public CorsFilter corsFilter() {
//
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		CorsConfiguration config = new CorsConfiguration();
//		config.addAllowedOriginPattern("*");
//		config.addAllowedMethod("*");
//		config.addAllowedHeader("*");
//		config.setAllowCredentials(true);
//		config.addExposedHeader("accessToken");
//		source.registerCorsConfiguration("/**", config);
//		return new CorsFilter(source);
//	}

}

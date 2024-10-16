package com.ERP.FinalProject.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

	// 자바스크립트로 들어오는
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("http://localhost:3002")
		.allowedMethods("GET","POST") //전송방식
		.allowCredentials(true)
		.allowedHeaders("*") //모든 헤더파일 허용
		.maxAge(3600);
	}
}

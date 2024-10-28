package com.ERP.FinalProject.global.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilter(HttpSecurity http) throws Exception {

		http.csrf().disable()
		.authorizeRequests().antMatchers("/api/**").permitAll()
		.anyRequest().permitAll();
		
        return http.build();


	}

}

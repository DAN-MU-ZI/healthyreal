package com.healthyreal.be.config.security;

import com.healthyreal.be.oauth.service.CustomUserDetailsService;
import com.healthyreal.be.oauth.token.AuthTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class JwtConfig {
	@Value("${jwt.secret}")
	private String secret;

	private final CustomUserDetailsService userDetailService;

	@Bean
	protected AuthTokenProvider jwtProvider() {
		return new AuthTokenProvider(secret, userDetailService);
	}
}

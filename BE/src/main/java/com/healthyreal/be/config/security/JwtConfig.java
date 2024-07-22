package com.healthyreal.be.config.security;

import com.healthyreal.be.oauth.token.AuthTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
	@Value("${jwt.secret}")
	private String secret;

	@Bean
	protected AuthTokenProvider jwtProvider() {
		return new AuthTokenProvider(secret);
	}
}

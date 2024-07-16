package com.healthyreal.be;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final Environment env;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf -> csrf
				.ignoringRequestMatchers(PathRequest.toH2Console())
			)
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(PathRequest.toH2Console()).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/swagger-ui/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/v3/api-docs/**")).permitAll()
				.anyRequest().authenticated()
			)
			.headers(header -> header
				.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin
				)
			);

		return http.build();
	}
}

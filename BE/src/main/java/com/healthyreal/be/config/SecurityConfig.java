package com.healthyreal.be.config;

import com.healthyreal.be.service.CustomOAuth2UserService;
import com.healthyreal.be.service.JwtAuthenticationFilter;
import com.healthyreal.be.service.OAuth2AuthorizationRequestBasedOnCookieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer.FrameOptionsConfig;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	private final OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository;
	private final CustomOAuth2UserService oAuth2UserService;

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.csrf(csrf -> csrf
				.ignoringRequestMatchers(PathRequest.toH2Console()))
			.formLogin(AbstractHttpConfigurer::disable)
			.httpBasic(AbstractHttpConfigurer::disable)
			.logout(AbstractHttpConfigurer::disable)
			.headers(headers -> headers
				.frameOptions(FrameOptionsConfig::sameOrigin))
			.sessionManagement(session -> session
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers(new AntPathRequestMatcher("/error")).permitAll()
				.requestMatchers(PathRequest.toH2Console()).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/swagger-ui/**")).permitAll()
				.requestMatchers(new AntPathRequestMatcher("/v3/api-docs/**")).permitAll()
				.requestMatchers("/login", "/oauth2/**").permitAll()
				.anyRequest().authenticated()
			)

			.oauth2Login(oauth2 -> oauth2
				.authorizationEndpoint(auth -> auth
					.baseUri("/oauth2/authorization")
					.authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository))
				.redirectionEndpoint(auth -> auth
					.baseUri("/*/oauth2/code/*"))
				.userInfoEndpoint(auth -> auth
					.userService(oAuth2UserService))
			)
			.addFilterAt(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}
}

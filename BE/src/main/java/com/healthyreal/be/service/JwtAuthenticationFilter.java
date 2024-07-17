package com.healthyreal.be.service;

import com.healthyreal.be.domain.CustomUserDetails;
import com.healthyreal.be.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final JwtUtil jwtUtil;
	private final CustomUserDetailsService customUserDetailsService;

	@Override
	protected void doFilterInternal(final HttpServletRequest request, final HttpServletResponse response,
		final FilterChain chain)
		throws ServletException, IOException {

		final String authorizationHeader = request.getHeader("Authorization");

		Long userId = null;
		String jwt = null;

		if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
			jwt = authorizationHeader.substring(7);
			userId = jwtUtil.extractUserId(jwt);
		}

		if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			CustomUserDetails userDetails = this.customUserDetailsService.loadUserById(userId);

			if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {

				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
					new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
					.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
			}
		}
		chain.doFilter(request, response);
	}
}

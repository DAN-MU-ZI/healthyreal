package com.healthyreal.be.oauth.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class TokenAccessDeniedHandler implements AccessDeniedHandler {
	private final HandlerExceptionResolver handlerExceptionResolver;

	@Override
	public void handle(final HttpServletRequest request, final HttpServletResponse response,
		final AccessDeniedException accessDeniedException) throws IOException, ServletException {
		handlerExceptionResolver.resolveException(request, response, null, accessDeniedException);
	}
}

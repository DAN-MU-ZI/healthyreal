package com.healthyreal.be.oauth.exception;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

@Slf4j
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
	@Override
	public void commence(final HttpServletRequest request, final HttpServletResponse response,
		final AuthenticationException authException) throws IOException, ServletException {
		authException.printStackTrace();
		log.info("Responding with unauthorized error. Message := {}", authException.getMessage());
		response.sendError(
			HttpServletResponse.SC_UNAUTHORIZED,
			authException.getLocalizedMessage()
		);
	}
}

package com.healthyreal.be.oauth.token;

import com.healthyreal.be.oauth.entity.UserPrincipal;
import com.healthyreal.be.oauth.exception.TokenValidFailedException;
import com.healthyreal.be.oauth.service.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

@Slf4j
public class AuthTokenProvider {
	private final SecretKey key;
	private static final String AUTHORITIES_KEY = "role";
	private final CustomUserDetailsService userDetailsService;

	public AuthTokenProvider(final String secret, final CustomUserDetailsService userDetailService) {
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
		this.userDetailsService = userDetailService;
	}

	public AuthToken createAuthToken(final String id, final Date expiry) {
		return new AuthToken(id, expiry, key);
	}

	public AuthToken createAuthToken(final String id, final String role, final Date expiry) {
		return new AuthToken(id, role, expiry, key);
	}

	public AuthToken convertAuthToken(final String token) {
		return new AuthToken(token, key);
	}

	public Authentication getAuthentication(AuthToken authToken) {
		if (authToken.validate()) {

			Claims claims = authToken.getTokenClaims();
			String username = claims.getSubject();

			UserPrincipal userPrincipal = userDetailsService.loadUserByUsername(username);

			log.debug("claims subject := [{}]", claims.getSubject());

			return new UsernamePasswordAuthenticationToken(userPrincipal, authToken, userPrincipal.getAuthorities());
		} else {
			throw new TokenValidFailedException();
		}
	}
}

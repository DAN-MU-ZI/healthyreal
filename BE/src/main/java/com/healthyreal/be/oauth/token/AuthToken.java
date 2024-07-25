package com.healthyreal.be.oauth.token;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class AuthToken {
	@Getter
	private final String token;
	private final SecretKey key;

	private static final String AUTHORITIES_KEY = "role";

	protected AuthToken(final String id, final Date expiry, final SecretKey key) {
		this.key = key;
		this.token = createAuthToken(id, expiry);
	}

	protected AuthToken(final String id, final String role, final Date expiry, final SecretKey key) {
		this.key = key;
		this.token = createAuthToken(id, role, expiry);
	}

	private String createAuthToken(final String id, final Date expiry) {
		return Jwts.builder()
			.subject(id)
			.signWith(key)
			.expiration(expiry)
			.compact();
	}

	private String createAuthToken(final String id, final String role, final Date expiry) {
		return Jwts.builder()
			.subject(id)
			.claim(AUTHORITIES_KEY, role)
			.signWith(key)
			.expiration(expiry)
			.compact();
	}

	public boolean validate() {
		return getTokenClaims() != null;
	}

	protected Claims getTokenClaims() {
		try {
			return Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token).getPayload();
		} catch (SecurityException e) {
			log.info("Invalid JWT signature");
		} catch (MalformedJwtException e) {
			log.info("Invalid JWT token");
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT token");
		} catch (UnsupportedJwtException e) {
			log.info("Unsupported JWT token");
		} catch (IllegalArgumentException e) {
			log.info("JWT token compact of handler are invalid");
		}
		return null;
	}

	public Claims getExpiredTokenClaims() {
		try {
			Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
		} catch (ExpiredJwtException e) {
			log.info("Expired JWT token.");
			return e.getClaims();
		}
		return null;
	}
}

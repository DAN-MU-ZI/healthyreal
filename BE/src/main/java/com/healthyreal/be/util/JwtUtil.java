package com.healthyreal.be.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {
	private final String SECRET_KEY = "4261656C6475sadfasdfasfasfasfasfasdfs6E67";
	private final SecretKey secretKey = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
	private final long accessTokenExpirationInMs = 1000 * 60 * 15; // 15 minutes
	private final long refreshTokenExpirationInMs = 1000 * 60 * 60 * 24 * 7; // 7 days

	public String generateAccessToken(Long userId, String username) {

		return generateToken(userId, username, accessTokenExpirationInMs);
	}

	public String generateRefreshToken(Long userId, String username) {
		return generateToken(userId, username, refreshTokenExpirationInMs);
	}

	private String generateToken(Long userId, String username, long expirationTime) {
		return Jwts.builder()
			.subject(username)
			.claim("userId", userId)
			.issuedAt(new Date())
			.expiration(new Date(System.currentTimeMillis() + expirationTime))
			.signWith(secretKey)
			.compact();
	}

	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Long extractUserId(String token) {
		return extractClaim(token, claims -> claims.get("userId", Long.class));
	}

	public Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser()
			.verifyWith(secretKey)
			.build()
			.parseSignedClaims(token)
			.getPayload();
	}

	private Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public Boolean validateToken(String token, String username) {
		final String extractedUsername = extractUsername(token);
		return (extractedUsername.equals(username) && !isTokenExpired(token));
	}
}

package com.healthyreal.be.config.security;

import com.healthyreal.be.api.entity.user.User;
import com.healthyreal.be.api.repository.user.UserRepository;
import com.healthyreal.be.oauth.entity.ProviderType;
import com.healthyreal.be.oauth.entity.RoleType;
import com.healthyreal.be.oauth.token.AuthToken;
import com.healthyreal.be.oauth.token.AuthTokenProvider;
import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Profile("local")
@RequiredArgsConstructor
public class LocalUserInitializer {

	private final UserRepository userRepository;
	private final AuthTokenProvider tokenProvider;

	@PostConstruct
	public void initLocalUsers() {
		if (userRepository.findByUserId("localuser") == null) {
			User user = new User(
				"localuser",
				"Local User",
				"localuser@example.com",
				"Y",
				"",
				ProviderType.KAKAO,
				RoleType.USER,
				LocalDateTime.now(),
				LocalDateTime.now()
			);
			userRepository.save(user);
			Date expiryDate = Date.from(LocalDateTime.now().plusDays(1).atZone(ZoneId.systemDefault()).toInstant());
			AuthToken authToken = tokenProvider.createAuthToken(user.getUserId(), user.getRoleType().getCode(),
				expiryDate);
			String token = authToken.getToken();
			log.info("Generated JWT token for {}: {}", user.getUserId(), token);
		}
		if (userRepository.findByUserId("localadmin") == null) {
			User admin = new User(
				"localadmin",
				"Local Admin",
				"localadmin@example.com",
				"Y",
				"",
				ProviderType.KAKAO,
				RoleType.ADMIN,
				LocalDateTime.now(),
				LocalDateTime.now()
			);
			userRepository.save(admin);
			Date expiryDate = Date.from(LocalDateTime.now().plusDays(1).atZone(ZoneId.systemDefault()).toInstant());
			AuthToken authToken = tokenProvider.createAuthToken(admin.getUserId(), admin.getRoleType().getCode(),
				expiryDate);
			String token = authToken.getToken();
			log.info("Generated JWT token for {}: {}", admin.getUserId(), token);
		}
	}
}
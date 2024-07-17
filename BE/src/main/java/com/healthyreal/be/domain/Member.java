package com.healthyreal.be.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@Entity
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userSeq;

	@Column(unique = true, nullable = false)
	private String userId;

	@Column(nullable = false)
	private String username;

	//	@Column(nullable = false)
	private String email;

	@Column(nullable = false)
	private String emailVerifiedYn;

	@Column(nullable = false, length = 2048)
	private String profileImageUrl;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private ProviderType providerType;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private RoleType roleType;

	@Column(nullable = false)
	private LocalDateTime createdAt;

	@Column(nullable = false)
	private LocalDateTime modifiedAt;

	public Member(final String userId, final String username, final String email,
		final String emailVerifiedYn, final String profileImageUrl,
		final ProviderType providerType, final RoleType roleType, final LocalDateTime createdAt,
		final LocalDateTime modifiedAt) {
		this.userId = userId;
		this.username = username;
		this.email = email;
		this.emailVerifiedYn = emailVerifiedYn;
		this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
		this.providerType = providerType;
		this.roleType = roleType;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
	}
}

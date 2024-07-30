package com.healthyreal.be.api.entity.user;

import java.time.LocalDateTime;

import net.minidev.json.annotate.JsonIgnore;

import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.userInfo.UserInfo;
import com.healthyreal.be.oauth.entity.ProviderType;
import com.healthyreal.be.oauth.entity.RoleType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Member {
	@JsonIgnore
	@Id
	@Column(name = "USER_SEQ")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userSeq;

	@Column(name = "USER_ID", length = 64, unique = true)
	@NotNull
	@Size(max = 64)
	private String userId;

	@Column(name = "USERNAME", length = 100)
	@NotNull
	@Size(max = 100)
	private String username;

	@JsonIgnore
	@Column(name = "PASSWORD", length = 128)
	@NotNull
	@Size(max = 128)
	private String password;

	@Column(name = "EMAIL", length = 512)
	@NotNull
	@Size(max = 512)
	private String email;

	@Column(name = "EMAIL_VERIFIED_YN", length = 1)
	@NotNull
	@Size(min = 1, max = 1)
	private String emailVerifiedYn;

	@Column(name = "PROFILE_IMAGE_URL", length = 2048)
	@NotNull
	@Size(max = 2048)
	private String profileImageUrl;

	@Column(name = "PROVIDER_TYPE", length = 20)
	@Enumerated(EnumType.STRING)
	@NotNull
	private ProviderType providerType;

	@Column(name = "ROLE_TYPE", length = 20)
	@Enumerated(EnumType.STRING)
	@NotNull
	private RoleType roleType;

	@Column(name = "GENDER", length = 10)
	@Enumerated(EnumType.STRING)
	private Gender gender;

	@Column(name = "CREATED_AT")
	@NotNull
	private LocalDateTime createdAt;

	@Column(name = "MODIFIED_AT")
	@NotNull
	private LocalDateTime modifiedAt;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private UserInfo userInfo;

	@OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private TrainerInfo trainerInfo;

	public Member(
		@NotNull @Size(max = 64) final String userId,
		@NotNull @Size(max = 100) final String username,
		@NotNull @Size(max = 512) final String email,
		@NotNull @Size(max = 1) final String emailVerifiedYn,
		@NotNull @Size(max = 2048) final String profileImageUrl,
		final ProviderType providerType,
		final RoleType roleType,
		final LocalDateTime createdAt,
		final LocalDateTime modifiedAt
	) {
		this.userId = userId;
		this.username = username;
		this.password = "NO_PASS";
		this.email = email != null ? email : "NO_EMAIL";
		this.emailVerifiedYn = emailVerifiedYn;
		this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
		this.providerType = providerType;
		this.roleType = roleType;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
	}
}


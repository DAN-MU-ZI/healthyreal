package com.healthyreal.be.service;

import com.healthyreal.be.domain.Member;
import com.healthyreal.be.domain.OAuth2UserInfo;
import com.healthyreal.be.domain.ProviderType;
import com.healthyreal.be.domain.RoleType;
import com.healthyreal.be.domain.UserPrincipal;
import com.healthyreal.be.repository.MemberRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final MemberRepository memberRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User user = super.loadUser(userRequest);

		try {
			return this.process(userRequest, user);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
		}
	}

	private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
		ProviderType providerType = ProviderType.valueOf(
			userRequest.getClientRegistration().getRegistrationId().toUpperCase());

		OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
		Member savedUser = memberRepository.findByProviderTypeAndEmail(providerType, userInfo.getEmail())
			.orElse(null);

		if (savedUser != null) {
			if (providerType != savedUser.getProviderType()) {
				throw new OAuth2AuthenticationException(
					"Looks like you're signed up with " + providerType +
						" account. Please use your " + savedUser.getProviderType() + " account to login."
				);
			}
			updateUser(savedUser, userInfo);
		} else {
			savedUser = createUser(userInfo, providerType);
		}

		return UserPrincipal.create(savedUser, user.getAttributes());
	}

	private Member createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
		LocalDateTime now = LocalDateTime.now();
		Member user = new Member(
			userInfo.getId(),
			userInfo.getName(),
			userInfo.getEmail(),
			"Y",
			userInfo.getImageUrl(),
			providerType,
			RoleType.USER,
			now,
			now
		);

		return memberRepository.saveAndFlush(user);
	}

	private Member updateUser(Member user, OAuth2UserInfo userInfo) {
		if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
			user.setUsername(userInfo.getName());
		}

		if (userInfo.getImageUrl() != null && !user.getProfileImageUrl().equals(userInfo.getImageUrl())) {
			user.setProfileImageUrl(userInfo.getImageUrl());
		}

		return user;
	}
}
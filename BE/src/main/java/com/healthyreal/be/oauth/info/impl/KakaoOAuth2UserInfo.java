package com.healthyreal.be.oauth.info.impl;

import com.healthyreal.be.oauth.info.OAuth2UserInfo;
import java.util.Map;
import java.util.Optional;

public class KakaoOAuth2UserInfo extends OAuth2UserInfo {
	public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
	}

	@Override
	public String getId() {
		return Optional.ofNullable(attributes.get("id"))
			.map(Object::toString)
			.orElse(null);
	}

	@Override
	public String getName() {
		return Optional.ofNullable((Map<String, Object>)attributes.get("properties"))
			.map(properties -> properties.get("nickname"))
			.map(Object::toString)
			.orElse(null);
	}

	@Override
	public String getEmail() {
		return Optional.ofNullable((Map<String, Object>)attributes.get("kakao_account"))
			.map(kakaoAccount -> kakaoAccount.get("email"))
			.map(Object::toString)
			.orElse(null);
	}

	@Override
	public String getImageUrl() {
		return Optional.ofNullable((Map<String, Object>)attributes.get("properties"))
			.map(properties -> properties.get("thumbnail_image"))
			.map(Object::toString)
			.orElse(null);
	}
}

package com.healthyreal.be.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
	GUEST("ROLE_GUEST", "일반 회원"),
	TRAINER("ROLE_USER", "트레이너");

	private final String key;
	private final String title;
}

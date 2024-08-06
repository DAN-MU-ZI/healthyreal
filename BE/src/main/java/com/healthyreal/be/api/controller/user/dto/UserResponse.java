package com.healthyreal.be.api.controller.user.dto;

import com.healthyreal.be.api.entity.user.Gender;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.oauth.entity.RoleType;

public record UserResponse(

	Gender gender,
	String userId,
	String email,
	String profileImageUrl,
	String phone,
	RoleType roleType,
	String username
) {
	public static UserResponse from(Member user) {
		return new UserResponse(user.getGender(), user.getUserId(), user.getEmail(), user.getProfileImageUrl(),
			user.getPhone(), user.getRoleType(), user.getUsername());
	}
}

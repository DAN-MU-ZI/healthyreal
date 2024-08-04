package com.healthyreal.be.api.controller.community;

import com.healthyreal.be.api.entity.community.Post;

import java.time.LocalDateTime;

public record PostCreateRequest(
	String title,
	String content
) {
	public Post toEntity() {
		return new Post(title, content, LocalDateTime.now(), LocalDateTime.now(), null);
	}
}

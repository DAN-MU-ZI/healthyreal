package com.healthyreal.be.api.controller.community.dto;

import java.time.LocalDateTime;

import com.healthyreal.be.api.entity.community.Post;

public record PostCreateRequest(
	String title,
	String content
) {
	public Post toEntity() {
		return new Post(title, content, LocalDateTime.now(), LocalDateTime.now(), null);
	}
}

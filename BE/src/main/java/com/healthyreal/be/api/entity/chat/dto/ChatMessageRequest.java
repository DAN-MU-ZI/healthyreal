package com.healthyreal.be.api.entity.chat.dto;

public record ChatMessageRequest(
	Long chatRoomId,
	String senderId,
	String content
) {
}

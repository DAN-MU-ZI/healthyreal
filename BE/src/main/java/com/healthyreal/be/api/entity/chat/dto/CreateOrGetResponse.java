package com.healthyreal.be.api.entity.chat.dto;

import java.time.LocalDateTime;

import com.healthyreal.be.api.entity.chat.ChatRoom;

public record CreateOrGetResponse(
	Long chatRoomId,
	LocalDateTime createAt
) {
	public static CreateOrGetResponse toResponse(ChatRoom chatRoom) {
		return new CreateOrGetResponse(
			chatRoom.getChatRoomId(),
			chatRoom.getCreatedAt()
		);
	}
}

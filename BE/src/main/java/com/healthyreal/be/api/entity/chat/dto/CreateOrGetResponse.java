package com.healthyreal.be.api.entity.chat.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.healthyreal.be.api.entity.chat.ChatRoom;

public record CreateOrGetResponse(
	Long chatRoomId,
	Long lastChatMsgId,
	LocalDateTime createAt,
	List<String> chatRoomUsersId
) {
	public static CreateOrGetResponse toResponse(ChatRoom chatRoom) {
		List<String> chatRoomUsers = chatRoom.getChatRoomUsers().stream()
			.map(users -> users.getMember().getUserId()).toList();

		return new CreateOrGetResponse(
			chatRoom.getChatRoomId(),
			chatRoom.getLastChatMsgId(),
			chatRoom.getCreatedAt(),
			chatRoomUsers
		);
	}
}

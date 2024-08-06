package com.healthyreal.be.api.entity.chat.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.healthyreal.be.api.entity.chat.ChatRoom;

public record ChatRoomsResponse(
	List<ChatRoomInfo> chatRooms
) {

	public static ChatRoomsResponse toResponse(List<ChatRoom> chatRoomList, Long currentUserSeq,
		List<String> messages) {
		List<ChatRoomInfo> chatRoomsResponse = new ArrayList<>();
		for (int i = 0; i < chatRoomList.size(); i++) {
			ChatRoomInfo chatRoomInfo = new ChatRoomInfo(
				chatRoomList.get(i).getChatRoomId(),
				messages.get(i),
				chatRoomList.get(i).getCreatedAt(),
				chatRoomList.get(i).getChatRoomUsers().stream()
					.filter(user -> !user.getMember().getUserSeq().equals(currentUserSeq))
					.map(user -> user.getMember().getUsername())
					.findFirst()
					.orElse("Unknown")
			);
			chatRoomsResponse.add(chatRoomInfo);
		}
		return new ChatRoomsResponse(chatRoomsResponse);
	}
}

record ChatRoomInfo(
	Long chatRoomId,
	String lastChatMsg,
	LocalDateTime createdAt,
	String chatRoomUser
){}
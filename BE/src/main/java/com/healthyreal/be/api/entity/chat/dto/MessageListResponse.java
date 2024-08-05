package com.healthyreal.be.api.entity.chat.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.healthyreal.be.api.entity.chat.Message;

public record MessageListResponse(
	List<GetMessage> messages
) {
	public static MessageListResponse toResponse(List<Message> messages){
		List<GetMessage> messageList = messages.stream()
			.map(message -> new GetMessage(
				message.getMember().getUserSeq(),
				message.getMember().getUsername(),
				message.getContent(),
				message.getSentAt()
			)).toList();

		return new MessageListResponse(messageList);
	}
}

record GetMessage(
	Long senderSeq,
	String senderName,
	String content,
	LocalDateTime sendAt
){}
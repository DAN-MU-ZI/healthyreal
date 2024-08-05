package com.healthyreal.be.api.entity.chat.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.healthyreal.be.api.entity.chat.Message;

public class MessageDTO {
	private Long messageId;
	private Long chatRoomId;
	private String senderId;
	private String content;
	private String senderName;

	@JsonCreator
	public MessageDTO(
		@JsonProperty("messageId") Long messageId,
		@JsonProperty("chatRoomId") Long chatRoomId,
		@JsonProperty("senderId") String senderId,
		@JsonProperty("content") String content,
		@JsonProperty("senderName") String senderName
	) {
		this.messageId = messageId;
		this.chatRoomId = chatRoomId;
		this.senderId = senderId;
		this.content = content;
		this.senderName = senderName;
	}

	public Long getMessageId() {
		return messageId;
	}

	public Long getChatRoomId() {
		return chatRoomId;
	}

	public String getSenderId() {
		return senderId;
	}

	public String getContent() {
		return content;
	}

	public String getSenderName() {
		return senderName;
	}

	public static MessageDTO from(Message message) {
		return new MessageDTO(
			message.getMessageId(),
			message.getChatRoom().getChatRoomId(),
			message.getMember().getUserId(),
			message.getContent(),
			message.getMember().getUsername()
		);
	}
}

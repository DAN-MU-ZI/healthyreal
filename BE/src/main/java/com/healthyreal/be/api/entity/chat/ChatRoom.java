package com.healthyreal.be.api.entity.chat;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChatRoom {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long chatRoomId;

	private Long lastChatMsgId;

	private LocalDateTime createdAt;

	@OneToMany(mappedBy = "chatRoom")
	private List<ChatRoomUsers> chatRoomUsers;

	@OneToMany(mappedBy = "chatRoom")
	private List<Message> messages;
}

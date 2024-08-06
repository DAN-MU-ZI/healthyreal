package com.healthyreal.be.api.entity.chat;

import com.healthyreal.be.api.entity.user.Member;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class ChatRoomUsers {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long chatRoomUsersId;

	@ManyToOne
	@JoinColumn(name = "userSeq")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "chatRoomId")
	private ChatRoom chatRoom;

	// Getters and Setters
}


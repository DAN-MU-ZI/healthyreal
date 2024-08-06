package com.healthyreal.be.api.entity.chat;

import java.time.LocalDateTime;

import com.healthyreal.be.api.entity.user.Member;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long messageId;

	private String content;

	private LocalDateTime sentAt;

	@ManyToOne
	@JoinColumn(name = "userSeq")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "chatRoomId")
	private ChatRoom chatRoom;

	// Getters and Setters
}


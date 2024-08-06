package com.healthyreal.be.api.repository.chat;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthyreal.be.api.entity.chat.ChatRoom;
import com.healthyreal.be.api.entity.chat.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
	List<Message> findByChatRoom(ChatRoom chatRoom);
}


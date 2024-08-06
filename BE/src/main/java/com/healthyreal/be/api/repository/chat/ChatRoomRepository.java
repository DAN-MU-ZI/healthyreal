package com.healthyreal.be.api.repository.chat;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.healthyreal.be.api.entity.chat.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}


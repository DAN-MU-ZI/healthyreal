package com.healthyreal.be.api.controller.chat;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthyreal.be.api.entity.chat.dto.ChatRoomsResponse;
import com.healthyreal.be.api.entity.chat.dto.CreateOrGetResponse;
import com.healthyreal.be.api.entity.chat.dto.MessageListResponse;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.service.ChatRoomService;
import com.healthyreal.be.utils.CurrentUser;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

	private final ChatRoomService chatRoomService;

	@PostMapping("/create-or-get")
	public CreateOrGetResponse getOrCreateChatRoom(
		@CurrentUser Member member,
		@RequestParam Long trainerInfoId
	) {
		return chatRoomService.getOrCreateChatRoom(member, trainerInfoId);
	}

	@PostMapping("/messages")
	public MessageListResponse getChatMessages(
		@RequestBody Long chatRoomId
	) {
		return chatRoomService.getChatMessages(chatRoomId);
	}

	@PostMapping("/send")
	public void sendMessage(
		@RequestParam Long chatRoomId,
		@CurrentUser Member member,
		@RequestParam String content
	) {
		chatRoomService.sendMessage(chatRoomId, member, content);
	}

	@PostMapping("/leave")
	public void leaveChatRoom(
		@RequestParam Long chatRoomId,
		@CurrentUser Member member
	) {
		chatRoomService.leaveChatRoom(chatRoomId, member);
	}

	@GetMapping("/member/rooms")
	public ChatRoomsResponse getUserChatRooms(
		@CurrentUser Member member
	) {
		return chatRoomService.getUserChatRooms(member);
	}
}

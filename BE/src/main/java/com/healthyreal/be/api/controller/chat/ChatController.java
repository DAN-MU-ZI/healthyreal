package com.healthyreal.be.api.controller.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.healthyreal.be.api.entity.chat.dto.ChatMessageRequest;
import com.healthyreal.be.api.entity.chat.dto.ChatRoomsResponse;
import com.healthyreal.be.api.entity.chat.dto.CreateOrGetResponse;
import com.healthyreal.be.api.entity.chat.dto.MessageDTO;
import com.healthyreal.be.api.entity.chat.dto.MessageListResponse;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.service.ChatRoomService;
import com.healthyreal.be.api.service.MemberService;
import com.healthyreal.be.utils.CurrentUser;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
public class ChatController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final MemberService memberService;
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
		@RequestParam(value = "chatRoomId") Long chatRoomId
	) {
		return chatRoomService.getChatMessages(chatRoomId);
	}

	@MessageMapping("/send")
	public void sendMessage(@Payload ChatMessageRequest chatMessageRequest) {
		log.info("Received message: {}", chatMessageRequest);
		String senderId = chatMessageRequest.senderId();
		Member member = memberService.getMemberById(senderId);
		MessageDTO messageDTO = chatRoomService.sendMessage(chatMessageRequest, member);
		simpMessagingTemplate.convertAndSend("/topic/chat/" + chatMessageRequest.chatRoomId(), messageDTO);
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

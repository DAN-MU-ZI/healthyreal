package com.healthyreal.be.api.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.healthyreal.be.api.entity.chat.ChatRoom;
import com.healthyreal.be.api.entity.chat.ChatRoomUsers;
import com.healthyreal.be.api.entity.chat.Message;
import com.healthyreal.be.api.entity.chat.dto.ChatMessageRequest;
import com.healthyreal.be.api.entity.chat.dto.ChatRoomsResponse;
import com.healthyreal.be.api.entity.chat.dto.CreateOrGetResponse;
import com.healthyreal.be.api.entity.chat.dto.MessageDTO;
import com.healthyreal.be.api.entity.chat.dto.MessageListResponse;
import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.repository.chat.ChatRoomRepository;
import com.healthyreal.be.api.repository.chat.ChatRoomUsersRepository;
import com.healthyreal.be.api.repository.chat.MessageRepository;
import com.healthyreal.be.api.repository.trainer.TrainerInfoRepository;
import com.healthyreal.be.api.repository.user.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

	private final ChatRoomRepository chatRoomRepository;
	private final ChatRoomUsersRepository chatRoomUsersRepository;
	private final UserRepository userRepository;
	private final MessageRepository messageRepository;
	private final TrainerInfoRepository trainerInfoRepository;

	@Transactional
	public CreateOrGetResponse getOrCreateChatRoom(Member member, Long trainerInfoId) {
		TrainerInfo trainerInfo = trainerInfoRepository.findById(trainerInfoId)
			.orElseThrow(() -> new RuntimeException("트레이너를 찾을 수 없습니다."));

		Member member2 = userRepository.findByTrainerInfo(trainerInfo);

		// 두 사용자 간의 기존 채팅방이 있는지 확인
		Optional<ChatRoom> existingChatRoom = chatRoomUsersRepository.findExistingChatRoom(member.getUserSeq(),
			member2.getUserSeq());
		if (existingChatRoom.isPresent()) {
			return CreateOrGetResponse.toResponse(existingChatRoom.get());
		}

		// 기존 채팅방이 없으면 새로운 채팅방 생성
		ChatRoom chatRoom = new ChatRoom();
		chatRoom.setCreatedAt(LocalDateTime.now());
		chatRoom = chatRoomRepository.save(chatRoom);

		addUserToChatRoom(chatRoom.getChatRoomId(), member.getUserSeq());
		addUserToChatRoom(chatRoom.getChatRoomId(), member2.getUserSeq());

		return CreateOrGetResponse.toResponse(chatRoom);
	}

	@Transactional
	public void addUserToChatRoom(Long chatRoomId, Long userSeq) {
		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
			.orElseThrow(() -> new RuntimeException("ChatRoom not found"));
		Member member = userRepository.findById(userSeq)
			.orElseThrow(() -> new RuntimeException("Member not found"));

		ChatRoomUsers chatRoomUsers = new ChatRoomUsers();
		chatRoomUsers.setChatRoom(chatRoom);
		chatRoomUsers.setMember(member);

		chatRoomUsersRepository.save(chatRoomUsers);
	}

	@Transactional
	public MessageListResponse getChatMessages(Long chatRoomId) {
		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
			.orElseThrow(() -> new RuntimeException("ChatRoom not found"));
		List<Message> messageList = messageRepository.findByChatRoom(chatRoom);
		return MessageListResponse.toResponse(messageList);
	}

	@Transactional
	public MessageDTO sendMessage(ChatMessageRequest chatMessageRequest, Member member) {
		Long chatRoomId = chatMessageRequest.chatRoomId();
		String senderId = chatMessageRequest.senderId();
		String content = chatMessageRequest.content();

		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
			.orElseThrow(() -> new RuntimeException("ChatRoom not found"));

		Member persistedMember = userRepository.findByUserId(senderId);
		if (persistedMember == null) {
			persistedMember = userRepository.save(member);
		}

		Message message = new Message();
		message.setChatRoom(chatRoom);
		message.setMember(persistedMember);
		message.setContent(content);
		message.setSentAt(LocalDateTime.now());

		Message savedMessage = messageRepository.save(message);
		chatRoom.setLastChatMsgId(savedMessage.getMessageId());

		return MessageDTO.from(savedMessage);
	}

	@Transactional
	public void leaveChatRoom(Long chatRoomId, Member member) {
		ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId)
			.orElseThrow(() -> new RuntimeException("ChatRoom not found"));

		ChatRoomUsers chatRoomUsers = chatRoomUsersRepository.findByChatRoomAndMember(chatRoom, member);
		chatRoomUsersRepository.delete(chatRoomUsers);
	}

	@Transactional
	public ChatRoomsResponse getUserChatRooms(Member member) {
		List<ChatRoom> chatRoomList = chatRoomUsersRepository.findChatRoomsByUser(member);
		List<String> messages = chatRoomList.stream().map(
			chatRoom -> {
				if (chatRoom.getLastChatMsgId() == null)
					return "메시지 내역 없음";
				return messageRepository.findById(chatRoom.getLastChatMsgId())
					.orElseThrow(() -> new RuntimeException("Get Message Content Error"))
					.getContent();
			}
		).toList();
		return ChatRoomsResponse.toResponse(chatRoomList, member.getUserSeq(), messages);
	}

	public String getMessage(Long messageId) {
		Message message = messageRepository.findById(messageId).orElse(null);
		if (message == null)
			return null;
		return message.getContent();
	}
}


package com.healthyreal.be.api.repository.chat;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.healthyreal.be.api.entity.chat.ChatRoom;
import com.healthyreal.be.api.entity.chat.ChatRoomUsers;
import com.healthyreal.be.api.entity.user.Member;

public interface ChatRoomUsersRepository extends JpaRepository<ChatRoomUsers, Long> {

	@Query("SELECT cu1.chatRoom FROM ChatRoomUsers cu1 " +
		"JOIN ChatRoomUsers cu2 ON cu1.chatRoom = cu2.chatRoom " +
		"WHERE cu1.member.userSeq = :userSeq1 AND cu2.member.userSeq = :userSeq2")
	Optional<ChatRoom> findExistingChatRoom(@Param("userSeq1") Long userSeq1, @Param("userSeq2") Long userSeq2);

	@Query("SELECT cu.chatRoom FROM ChatRoomUsers cu WHERE cu.member = :member")
	List<ChatRoom> findChatRoomsByUser(@Param("member") Member member);

	ChatRoomUsers findByChatRoomAndMember(ChatRoom chatRoom, Member member);
}



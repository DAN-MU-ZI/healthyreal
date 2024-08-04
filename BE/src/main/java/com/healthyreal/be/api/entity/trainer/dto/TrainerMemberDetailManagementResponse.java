package com.healthyreal.be.api.entity.trainer.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.healthyreal.be.api.entity.Ticket;
import com.healthyreal.be.api.entity.user.Gender;
import com.healthyreal.be.api.entity.user.Member;

public record TrainerMemberDetailManagementResponse(
	String name,
	Gender gender,
	LocalDate birthDate,
	String profileUrl,
	String phone,
	MemberBodyInfo memberBodyInfo,
	List<CurrentProgram> currentProgramList,
	List<String> memos
) {
	public static TrainerMemberDetailManagementResponse toResponse(Member member, List<Ticket> ticketList) {

		MemberBodyInfo memberBodyInfo = new MemberBodyInfo(member.getUserInfo().getBodyInfo().getHeight(),
			member.getUserInfo().getBodyInfo().getWeight());

		List<CurrentProgram> currentPrograms = ticketList.stream()
			.map(ticket -> new CurrentProgram(
				ticket.getTrainingProgram().getTitle(),
				ticket.getTotalCnt(),
				ticket.getRemainingCnt()))
			.toList();

		List<String> memos = ticketList.stream()
			.map(Ticket::getMemo).toList();

		return new TrainerMemberDetailManagementResponse(
			member.getUsername(),
			member.getGender(),
			member.getUserInfo().getBodyInfo().getBirthDate(),
			member.getProfileImageUrl(),
			member.getPhone(),
			memberBodyInfo,
			currentPrograms,
			memos
			);
	}
}

record MemberBodyInfo(Double height, Double weight) {
}

record CurrentProgram(String programName, Long totalCnt, Long remainingCnt) {
}

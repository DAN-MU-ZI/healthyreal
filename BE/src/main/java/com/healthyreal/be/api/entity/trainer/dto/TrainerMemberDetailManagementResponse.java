package com.healthyreal.be.api.entity.trainer.dto;

import java.time.LocalDate;
import java.util.List;

import com.healthyreal.be.api.entity.Ticket;
import com.healthyreal.be.api.entity.user.Gender;
import com.healthyreal.be.api.entity.user.Member;

public record TrainerMemberDetailManagementResponse(
	String name,
	Gender gender,
	LocalDate birthDate,
	String profileUrl,
	String phone,
	List<MemberBodyInfo> memberBodyInfoList,
	List<CurrentProgram> currentProgramList,
	List<String> memos
) {
	public static TrainerMemberDetailManagementResponse toResponse(Member member, List<Ticket> ticketList) {

		List<MemberBodyInfo> memberBodyInfoList = member.getUserInfo()
			.getBodyInfoList()
			.stream()
			.map(bodyInfo -> new MemberBodyInfo(
				bodyInfo.getHeight(),
				bodyInfo.getWeight()
			))
			.toList();

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
			member.getUserInfo().getBirthDate(),
			member.getProfileImageUrl(),
			member.getPhone(),
			memberBodyInfoList,
			currentPrograms,
			memos
		);
	}
}

record MemberBodyInfo(Double height, Double weight) {
}

record CurrentProgram(String programName, Long totalCnt, Long remainingCnt) {
}

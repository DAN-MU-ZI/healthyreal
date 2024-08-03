package com.healthyreal.be.api.entity.trainer.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.healthyreal.be.api.entity.Ticket;

public record TrainerMemberManagementResponse(
	List<MemberDTO> members
	) {

	public static TrainerMemberManagementResponse toResponse(List<Ticket> tickets) {
		List<MemberDTO> members = tickets.stream()
			.map(ticket -> new MemberDTO(
				ticket.getMember().getUserSeq(),
				ticket.getMember().getUsername(),
				ticket.getMember().getGender(),
				ticket.getTrainingProgram().getTitle(),
				ticket.getTotalCnt(),
				ticket.getRemainingCnt()
			)).collect(Collectors.toList());

		return new TrainerMemberManagementResponse(members);
	}
}

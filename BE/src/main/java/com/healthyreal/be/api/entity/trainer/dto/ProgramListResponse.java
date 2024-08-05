package com.healthyreal.be.api.entity.trainer.dto;

import java.util.List;

import com.healthyreal.be.api.entity.trainer.TrainingProgram;

public record ProgramListResponse(
	List<String> ticketTitleList
) {
	public static ProgramListResponse toResponse(List<TrainingProgram> programList){
		List<String> ticketTitleList = programList.stream()
			.map(TrainingProgram::getTitle).toList();
		return new ProgramListResponse(ticketTitleList);
	}
}

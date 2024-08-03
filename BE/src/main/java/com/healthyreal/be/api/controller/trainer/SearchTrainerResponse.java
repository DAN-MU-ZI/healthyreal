package com.healthyreal.be.api.controller.trainer;

import com.healthyreal.be.api.entity.userInfo.GoalType;

import java.util.List;

public record SearchTrainerResponse(
	List<FoundTrainer> trainers,
	int totalPages,
	long totalElements,
	int currentPage,
	int pageSize
) {
	public record FoundTrainer(
		String thumbNailUrl,
		Long trainerId,
		String name,
		String address,
		String phoneNumber,
		String describe,
		List<GoalType> categories
	) {
	}
}
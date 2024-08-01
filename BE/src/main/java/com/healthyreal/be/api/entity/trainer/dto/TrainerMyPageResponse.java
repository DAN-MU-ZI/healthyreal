package com.healthyreal.be.api.entity.trainer.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.healthyreal.be.api.entity.trainer.Qualification;
import com.healthyreal.be.api.entity.trainer.TrainerInfo;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import com.healthyreal.be.api.entity.user.Member;
import com.healthyreal.be.api.entity.userInfo.Gym;

public record TrainerMyPageResponse(
	String trainerName,
	String trainerDescription,
	String trainerPhone,
	String gymName,
	String gymAddress,
	String gymPhone,
	List<TrainerProgram> trainingPrograms,
	List<TrainerQualification> trainerQualifications,
	String profileImageUrl
) {

	public static TrainerMyPageResponse toResponse(Member user, TrainerInfo trainerInfo, Gym gym,
		List<TrainingProgram> trainingPrograms, List<Qualification> qualifications) {

		List<TrainerProgram> trainerPrograms = trainingPrograms.stream()
			.map(trainingProgram -> new TrainerProgram(
				trainingProgram.getTitle(),
				trainingProgram.getDescription()
			))
			.collect(Collectors.toList());

		List<TrainerQualification> trainerQualifications = qualifications.stream()
			.map(qualification -> new TrainerQualification(
				qualification.getContent(),
				qualification.getStartDate()
			)).collect(Collectors.toList());

		return new TrainerMyPageResponse(user.getUsername(), trainerInfo.getProfileDescription(), user.getPhone(),
			gym.getName(), gym.getAddress(), gym.getGymPhone(), trainerPrograms, trainerQualifications,
			user.getProfileImageUrl());
	}
}

record TrainerProgram(
	String programTitle,
	String programDescription
) {
}

record TrainerQualification(
	String qualificationName,
	LocalDate startDate
) {
}



package com.healthyreal.be.api.entity.userInfo.dto;

import com.healthyreal.be.api.entity.userInfo.BodyInfo;
import com.healthyreal.be.api.entity.userInfo.ExerciseLevel;
import com.healthyreal.be.api.entity.userInfo.Gender;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.entity.userInfo.Gym;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record MemberRegisterRequest(Gender gender,
									ExerciseLevel exerciseLevel,
									GymDto gymDto,
									BodyInfoDto bodyInfoDto,
									List<GoalType> goalTypes) {

	/*
	"name": "My Gym",
	"address": "123 Fitness St."
	 */
	public record GymDto(String name, String address) {
		public Gym toEntity() {
			return new Gym(name, address);
		}
	}

	/*
	"birthDate": "1990-01-01",
	"height": 180.0,
	"weight": 75.0,
	 */
	public record BodyInfoDto(LocalDate birthDate,
							  Double height,
							  Double weight) {
		public BodyInfo toEntity() {
			return new BodyInfo(birthDate, height, weight);
		}
	}

	public List<Goal> goalTypesToEntity() {
		return goalTypes.stream().map(Goal::new).collect(Collectors.toList());
	}
}

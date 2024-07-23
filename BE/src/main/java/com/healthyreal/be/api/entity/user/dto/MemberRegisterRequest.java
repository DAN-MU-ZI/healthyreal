package com.healthyreal.be.api.entity.user.dto;

import java.time.LocalDate;
import java.util.List;

public record MemberRegisterRequest(Gender gender,
									ExerciseLevel exerciseLevel,
									Gym gym,
									BodyInfo bodyInfo,
									List<Goal> goals) {

	// 성별 ENUM
	public enum Gender {
		MALE, FEMALE, OTHER
	}

	// 운동 수준 ENUM
	public enum ExerciseLevel {
		BEGINNER, INTERMEDIATE, ADVANCED
	}

	// 헬스장 정보 DTO
	public record Gym(String name, Address address) {
	}

	// 주소 정보 DTO
	public record Address(String street, String city, String state, String zipCode) {
	}

	// 신체 정보 DTO
	public record BodyInfo(LocalDate birthDate, Double height, Double weight) {
	}

	// 목표 ENUM
	public enum Goal {
		WEIGHT_LOSS, MUSCLE_GAIN, STAMINA_IMPROVEMENT, FLEXIBILITY_IMPROVEMENT,
		BODY_SHAPE_IMPROVEMENT, BALANCE_IMPROVEMENT, LIFESTYLE_IMPROVEMENT,
		HEALTH_IMPROVEMENT, BODY_PROFILE, OTHER
	}
}

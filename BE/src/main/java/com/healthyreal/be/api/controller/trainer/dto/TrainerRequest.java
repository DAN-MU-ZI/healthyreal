package com.healthyreal.be.api.controller.trainer.dto;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.healthyreal.be.api.entity.trainer.Qualification;
import com.healthyreal.be.api.entity.trainer.QualificationCategory;
import com.healthyreal.be.api.entity.trainer.TrainerSchedule;
import com.healthyreal.be.api.entity.trainer.TrainingProgram;
import com.healthyreal.be.api.entity.userInfo.Goal;
import com.healthyreal.be.api.entity.userInfo.GoalType;
import com.healthyreal.be.api.entity.userInfo.Gym;

import io.swagger.v3.oas.annotations.media.Schema;

public record TrainerRequest(
	GymDto gymDto,
	List<GoalType> goalTypes,
	QualificationDto qualificationDto, // 단일 자격증으로 수정했습니다.
	TrainingProgramDto trainingProgramDto,
	List<ScheduleDto> scheduleDtoList,
	String profileDescription
) {
	public record GymDto(String name, String address) {
		public Gym toEntity() {
			return new Gym(name, address);
		}
	}

	public List<Goal> goalTypesToEntity() {
		return goalTypes.stream().map(Goal::new).collect(Collectors.toList());
	}

	public record QualificationDto(String content, QualificationCategory category,
								   @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
								   LocalDate startDate,
								   @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
								   LocalDate endDate,
								   String description) {
		public Qualification toEntity() {
			return new Qualification(content, category, startDate, endDate, description);
		}
	}

	public Qualification qualificationDtoToEntity() { // 단일 자격증 변환 메서드로 수정
		return qualificationDto.toEntity();
	}

	public record TrainingProgramDto(String title, String description, List<GoalType> goalTypes) {
		public TrainingProgram toEntity() {
			List<Goal> goalList = goalTypes.stream().map(Goal::new).collect(Collectors.toList());
			return new TrainingProgram(title, description, goalList);
		}
	}

	public record ScheduleDto(DayOfWeek dayOfWeek,
							  @Schema(description = "End time in HH:mm format", example = "10:00")
							  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
							  LocalTime startTime,
							  @Schema(description = "End time in HH:mm format", example = "10:00")
							  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
							  LocalTime endTime) {
		public TrainerSchedule toEntity() {
			return new TrainerSchedule(dayOfWeek, startTime, endTime);
		}
	}

	public List<TrainerSchedule> scheduleDtoListToEntity() {
		return scheduleDtoList.stream().map(ScheduleDto::toEntity).collect(Collectors.toList());
	}
}

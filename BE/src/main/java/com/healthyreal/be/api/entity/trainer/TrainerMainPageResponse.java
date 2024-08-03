package com.healthyreal.be.api.entity.trainer;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import com.healthyreal.be.api.entity.Meal;
import com.healthyreal.be.api.entity.MealType;
import com.healthyreal.be.api.entity.Ticket;
import com.healthyreal.be.api.entity.schedule.Schedule;
import com.healthyreal.be.api.entity.user.Gender;

public record TrainerMainPageResponse(
	List<ScheduleDTO> schedules,
	List<MealDTO> meals,
	List<MemberDTO> members
) {

	public static TrainerMainPageResponse toResponse(List<Schedule> schedules, List<Meal> meals, List<Ticket> tickets) {
		List<ScheduleDTO> scheduleDTOs = schedules.stream()
			.map(schedule -> new ScheduleDTO(
				schedule.getScheduleId(),
				schedule.getTitle(),
				schedule.getStartTime(),
				schedule.getEndTime(),
				schedule.getMember().getUsername() // Assuming Member entity has a getName() method
			))
			.collect(Collectors.toList());

		List<MealDTO> mealDTOs = meals.stream()
			.map(meal -> new MealDTO(
				meal.getId(),
				meal.getMember().getUsername(), // Assuming Member entity has a getName() method
				meal.getDate(),
				meal.getMealType()// Assuming Meal entity has a getMealType() method
			))
			.collect(Collectors.toList());

		List<MemberDTO> memberDTOs = tickets.stream()
			.map(ticket -> new MemberDTO(
				ticket.getMember().getUserSeq(),
				ticket.getMember().getUsername(),
				ticket.getMember().getGender(),
				ticket.getTrainingProgram().getTitle(),
				ticket.getTotalCnt(),
				ticket.getRemainingCnt()
			)) // Assuming Ticket entity has a getMember() method
			.collect(Collectors.toList());

		return new TrainerMainPageResponse(scheduleDTOs, mealDTOs, memberDTOs);
	}
}

record ScheduleDTO(
	Long scheduleId,
	String title,
	LocalTime startTime,
	LocalTime endTime,
	String memberName
) {
}

record MealDTO(
	Long mealId,
	String memberName,
	LocalDate date,
	MealType mealType
) {
}

record MemberDTO(
	Long memberSeq,
	String name,
	Gender gender,
	String programName,
	Long totalCnt,
	Long remainingCnt
) {
}


